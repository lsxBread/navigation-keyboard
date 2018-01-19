window.onload = function() {

    // init data
    var init = init();
    var keys = init['keys'];
    var hash = init['hash'];
    
    // create keyboard
    generateKeyboard(keys, hash);

    // listen on keyboard
    listenToUser();

    //utilites
    function init() {
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
        var hashInLocalStorage = getFromLocalStorage('newHash');
        if (hashInLocalStorage) {
            hash = hashInLocalStorage;
        }

        return {'keys':keys, 'hash': hash};
    }

    function generateKeyboard(keys, hash) {
        for(var index = 0; index < keys['length']; index++) {
            var div = tag('div');
            var keyboard = document.getElementById('keyboard');
            keyboard.appendChild(div);
            var row = keys[index];
            for (var i = 0; i < row.length; i++){
            
                var span = createSpan(row[i]);
    
                var editBtn = createEditBtn(row[i]);
                
                var img = createImg(hash[row[i]]);
    
                var kbd = createKBD();
                kbd.appendChild(span);
                kbd.appendChild(editBtn);
                kbd.appendChild(img); 
    
                div.appendChild(kbd);
            }
        }
    }

    function listenToUser() {
        document.onkeypress = function(k) { //listen on keyborad press
            key = k.key;
            website = hash[key];
            console.log(website);
            // location.href = 'http://' + website; //change the url in browser
            window.open('http://' + website, '_blank'); //open website in new page
        }
    }

    function getFromLocalStorage(name) {
        return JSON.parse(localStorage.getItem(name) || 'null');
    }
    
    function tag(tagName, attributes) {
        var element = document.createElement(tagName);
        for (var attri in attributes) {
            element[attri] = attributes[attri];
        }
        return element;
    }

    function createEditBtn(key) {
        var editBtn =  tag('button', {textContent: 'E'});
        editBtn.onclick = function() {
            var newWebsite = prompt("Please update the website you like");
            if(newWebsite != null) {
                hash[key] = newWebsite;// change hash
                localStorage.setItem('newHash', JSON.stringify(hash)); // save hash as string in local storage
                var currentImg = editBtn.nextSibling;
                currentImg.src = 'http://' + newWebsite + '/favicon.ico';
                currentImg.onerror = function(e) {
                    console.log("img does not appear ")
                    e.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png';
                } 
            }
        }

        return editBtn;
    }

    function createSpan(content) {
        return tag('span', {textContent: content, className: "text"});
    }

    function createImg(source) {
        var img = tag('img');
        if (source) {
            img.src = 'http://' + source + '/favicon.ico';
        } else {
            img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png';
        }
        img.onerror = function(e) {
            console.log("img does not appear ")
            e.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png';
        }

        return img;
    }

    function createKBD() {
        return tag('kbd');
    }
}