const fs = require('fs');
const https = require('https');

const API_URL = 'https://openrouter.ai/api/v1/models';
const FILE_PATH = './src/data/models.json';

https.get(API_URL, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  
  res.on('end', () => {
    try {
      const openRouterData = JSON.parse(data).data;
      
      let localData = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));

      localData = localData.map(localModel => {
        // Try to find the matching model in openrouter
        const remoteModel = openRouterData.find(rm => rm.id === localModel.id || rm.name === localModel.name || rm.id.includes(localModel.id));
        
        let newDesc = localModel.description;
        let newFullDesc = localModel.fullDescription;

        if (remoteModel && remoteModel.description && remoteModel.description.length > 20) {
          // If remote description is good, use it perfectly
          newDesc = remoteModel.description.substring(0, 120).replace(/\n/g, ' ') + '...';
          newFullDesc = remoteModel.description;
        } else {
            // Keep procedural if there is absolutely no remote description
        }

        return {
            ...localModel,
            description: newDesc,
            fullDescription: newFullDesc
        };
      });

      fs.writeFileSync(FILE_PATH, JSON.stringify(localData, null, 2));
      console.log('Successfully updated model details perfectly!');

    } catch(e) {
      console.error(e);
    }
  });
}).on('error', (e) => {
  console.error(e);
});
