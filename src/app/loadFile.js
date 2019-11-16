export default async function loadFile(e){    
    return new Promise((resolve,reject)=>{
      var file = e.target.files[0];
      if (!file) {
        reject();
      }
  
      var reader = new FileReader();

      reader.onload = function(e) {
        //console.log(e.target.result);
        resolve(e.target.result);
      };

      reader.onerror = reject
   
      reader.readAsText(file);
  
    })
}