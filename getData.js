let fs = require("fs");
const fetch = require("node-fetch");
fs.readFile("linkData.txt", "utf-8", (err, data) => {
    let arr = data.split(",");
    arr.forEach(item => {

        fetch('http://' + item) // Call the fetch function passing the url of the API as a parameter
            .then((data) => {
                data.text().then(function(text) {
                    // var pattern = /<body[^>]*>((.|[\n\r])*)<\/body>/im   -- Get only body tag\
                    var pattern = /<img.*?src="(.*?)"[^\>]+>/g
                    var imgTag = pattern.exec(text); // Get only body tag
                    // writeFile function with filename, content and callback function
                    fs.writeFile('./Datas/' + item.split(".")[0] + '.txt', imgTag, function(err) {
                        if (err) throw err;
                        console.log('File is created successfully.');
                    });
                });

            })
            .catch(err => {
                console.error(err);
            });
    })
})