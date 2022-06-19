const getContributors = () => {
    Promise.all([
        fetch(`https://api.github.com/repos/melizeche/AireLibre/contributors`), 
        fetch(`https://api.github.com/repos/tchx84/linka/contributors`),
        fetch(`https://api.github.com/repos/garyservin/linka-firmware/contributors`),
        fetch(`https://api.github.com/repos/melizeche/linkaBot/contributors`),
        fetch(`https://api.github.com/repos/matiasinsaurralde/aqmap/contributors`),
        fetch(`https://api.github.com/repos/LucasGinard/AireLibre-Android/contributors`),
      ])
        .then(async([aireLibre, linka,linkaFirmware,linkBot,aqmap,appAndroid]) => {
            let contributors = [];
            contributors.push(await aireLibre.json());
            contributors.push(await linka.json());
            contributors.push(await linkaFirmware.json());
            contributors.push(await linkBot.json());
            contributors.push(await aqmap.json());
            contributors.push(await appAndroid.json());
            let listContributors = [];
            contributors.forEach(element => {
                element.forEach(auxElement =>{
                    listContributors.push(auxElement);
                });
            });
            listContributors = listContributors.filter((thing, index, self) =>
                index === self.findIndex((t) => (
                t.login === thing.login
                ))
            );
            listContributors = listContributors.sort(function(a, b){
                var nameA = a.login.toLowerCase(), nameB = b.login.toLowerCase();
                if (nameA < nameB)
                 return -1;
                if (nameA > nameB)
                 return 1;
                return 0;
               });
            const div = document.querySelector(".contributorsContainer");
            div.innerHTML = listContributors.map(u => 
                (`<div class="divContributor">
                <a class="link" href="${u.html_url}" target="_blank">
                <img id="contributorsImg" src="${u.avatar_url}" 
                    alt="imgContruibutor"  
                />
                </a>
                <p class=colorTheme>${u.login}</p>
                </div>`
                )
                ).join('<br />'); 

            getSaveTheme();
        })
        .catch((error) => console.error(error));
};
getContributors();