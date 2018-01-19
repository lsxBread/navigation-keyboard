window.onload = function() {
    var keyboard = document.getElementById('keyboard');

    var keys = {
        '0':['q','w','e','r','t','y','u','i','o','p'],
        '1':['a','s','d','f','g','h','j','k','l'],
        '2':['z','x','c','v','b','n','m'],
        'length': 3
    }

    var hash = {
        q: 'qq.com',
        w: 'weibo.com',
        e: 'ele.com',
        r: 'renren.com',
        y: 'yahoo.com',
        i: 'iqiyi.com',
        o: 'opera.com',
        a: 'acfun.tv',
    }
    
    // get hash from local storage
    var hashInLocalStorage = JSON.parse(localStorage.getItem('newHash') || '');

    if (hashInLocalStorage) {
        hash = hashInLocalStorage;
    }

    var index = 0;
    while(index < keys['length']) {
        var div = document.createElement('div');
        keyboard.appendChild(div);
        var row = keys[index];
        var i = 0;
        while (i < row.length) {
            var kbd = document.createElement('kbd');
            kbd.textContent = row[i];
            var editBtn = document.createElement('button');
            editBtn.textContent = "E";
            editBtn.id = row[i];
            editBtn.onclick = function(btn) {
                
                newWebsite = prompt("Please update the website you like");
                if(newWebsite != null) {
                    hash[btn.target.id] = newWebsite;// change hash
                    localStorage.setItem('newHash', JSON.stringify(hash)); // save hash as string in local storage
                }
            }
            kbd.appendChild(editBtn);
            div.appendChild(kbd);
            i += 1;
        } 
        index+=1;
    }

    document.onkeypress = function(k) { //listen on keyborad press
        key = k.key;
        website = hash[key];
        console.log(website);
        // location.href = 'http://' + website; //change the url in browser
        window.open('http://' + website, '_blank'); //open website in new page
    }
}