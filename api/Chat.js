class Chat {
    constructor() {
        this.users = new Map();
    }

    addUser(ws, user) {
        this.users.set(ws, user);
    }

    checkUser(user) {
        const arr = [...this.users.values()];
        if (arr.includes(user)) {
            return false
        } else {
            return true
        }
    }

    deleteUser(ws) {
        this.clients.delete(ws);
    }

    getActiveClients() {
        const result = [];
        this.users.forEach((value, key) => {
            if (key.readyState === 1) {
                result.push(value);
            }
        });
        return result;
    }

    getCurrentDate() {
        const currentDate = new Date();

        const curYear = currentDate.getFullYear();
        let curMonth = currentDate.getMonth() + 1;
        if (curMonth < 10) {
            curMonth = `0${curMonth}`;
        }
        let curDate = currentDate.getDate();
        if (curDate < 10) {
            curDate = `0${curDate}`;
        }

        let curHours = currentDate.getHours();
        if (curHours < 10) {
            curHours = `0${curHours}`;
        }
        let curMinutes = currentDate.getMinutes();
        if (curMinutes < 10) {
            curMinutes = `0${curMinutes}`;
        }
        return `${curHours}:${curMinutes} ${curDate}.${curMonth}.${curYear}`;
    }

}



module.exports = Chat;