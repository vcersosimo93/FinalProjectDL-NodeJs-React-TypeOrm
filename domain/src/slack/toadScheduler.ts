const { ToadScheduler, SimpleIntervalJob, Task } = require('toad-scheduler')

const scheduler = new ToadScheduler()

let counter=0;

const task = new Task('simple task', () => { 
    let fechaActual = new Date();
    counter++ ; 
    console.log(counter);  
    console.log(fechaActual)
})

const jobToad = new SimpleIntervalJob({ seconds: 1, }, task)

scheduler.addSimpleIntervalJob(jobToad)

// when stopping your app
//scheduler.stop()

/*
const message =  (){
    text:
      `Buenas!! Les envío las opciones del próximo día hábil! :raised_hands::skin-tone-2:  :
    :letra-a: ${req.body.Menu[0]}
    :letra-b:
    :letra-c: 
    :letra-d: 
    :letra-e: 
  
    Para quien desee adaptar alguno de estos menús a opción vegana, le pedimos que reaccione con :seedling:  además de la letra de su elección.
    Horarios:
    :one: 12:30
    :two: 12:45
    :three: 13:00
    :four: 13:15
    :five: 13:30
    :six: 13:45
    :seven: 14:00
  `}/*