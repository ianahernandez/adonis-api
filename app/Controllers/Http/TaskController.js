'use strict'

const Task = use('App/Models/Task');

class TaskController {
    async index ({ response  }) {
        let tasks = await Task.all()
        return response.json(tasks)
    }

    async store ({ request, response }) {
        const taskInfo = request.only(['task_name'])
        const task = new Task()
        task.task_name = taskInfo.task_name

        await task.save()
        return response.status(200).json(task)
    }

    async show ({ params, response }) {
        let task = await Task.find(params.id)
        return response.json(task)

    }

    async update ({ params, request, response }) {
        const taskInfo = request.only(['task_name'])
        const task = await Task.find(params.id)

        if(!task){

            return response.status(404).json({data: 'Tarea no encontrada'})

        }
        
        task.task_name = taskInfo.task_name

        await task.save()

        return response.status(200).json(task)

    }

    async delete ({ params, response }) {
        let task = await Task.find(params.id)
        
        if(!task){
            return response.status(404).json({data: 'Tarea no encontrada'})
        }

        await task.delete()

        return response.status(200).json(task)


    }


}

module.exports = TaskController
