var sqlMap = {

    login: 'select * from user_info where id=?',
    register: 'insert into user_info(id,password) values(?,?)',
    establish_habit_table:'CREATE TABLE IF NOT EXISTS habit(id varchar(20));',

}
module.exports = sqlMap;