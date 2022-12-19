const { ToadScheduler, SimpleIntervalJob, Task } = require('toad-scheduler')

const scheduler = new ToadScheduler()

let counter=0;

const task = new Task('simple task', () => { 
    counter++ ; console.log(counter)  
})
const job = new SimpleIntervalJob({ seconds: 1, }, task)
//console.log(task)

scheduler.addSimpleIntervalJob(job)

// when stopping your app
//scheduler.stop()