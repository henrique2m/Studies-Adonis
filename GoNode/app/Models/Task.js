'use strict'

const Model = use('Model')

class Task extends Model {
    static boot () {
        super.boot()

        this.addHook('afterCreate', 'TaskHook.sendNewTaskMail')
        this.addHook('beforeUpdate', 'TaskHook.sendNewTaskMail')
        // this.addHook('afterSave', 'TaskHook.sendNewTaskMail')
        // this.addHook('beforeSave', 'TaskHook.sendNewTaskMail')
    }

    project () {
        return this.belongsTo('App/Models/Project')
    }

    user () {
        return this.belongsTo('App/Models/User')
    }

    file () {
        return this.belongsTo('App/Models/File')
    }
}


module.exports = Task
