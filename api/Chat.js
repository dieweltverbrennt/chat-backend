class Chat {
    constructor() {
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
    }

    checkUser(user) {
        if (this.users.includes(user)) {
            return false;
        } else {
            return true;
        }
    }

    deleteUser(user) {
        const toDelete = this.users.findIndex(user);
        this.users.splice(toDelete, 1);
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