function getItem(key: string) {
    try {
        let value: string | null = localStorage.getItem(key);
        if(value) {
            return JSON.parse(value);
        }
        return null;
    }
    catch (err) {
        console.log(err)
    }
}

function setItem(key: string, value: any) {
    let val: string = JSON.stringify(value);
    try {
        return localStorage.setItem(key, val);
    }
    catch (err) {
        console.log(err)
    }
}

function removeItem(key: string) {
    try {
        return localStorage.removeItem(key);
    }
    catch (err) {
        console.log(err)
    }
}

function clearAll() {
    try {
        return localStorage.clear();
    }
    catch (err) {
        console.log(err)
    }
}

export default {
    getItem,
    setItem,
    removeItem,
    clearAll
}