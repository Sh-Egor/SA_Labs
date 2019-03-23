document.addEventListener('DOMContentLoaded', start);

let regexp;

function start() {
  getDataFromServer('samplesDB.json').then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Bad response!')
    }
  }).then((json) => {    
    renderTask(json[0]);
  }).catch(error => console.error(error))

  const samplesElem = document.querySelector('.samples');
  samplesElem.addEventListener('input', (event) => {
    const inputElement = even.target;
    if(inputElement.matches('input'))
      inputHandler(event.target);
  })
  const regexpElem = document.getElementById('regexp');
  regexpElem.oninput = event => {
    regexp = getRegexp();
    document.querySelectorAll('.sample input').forEach(inputHandler)
  }
}

function inputHandler(inputElem) {
  const match = compareInputWithRegexp(inputElem.value);
  toggleMatchClass(match, inputElem.nextElementSibling);
}

function toggleMatchClass(match, answer) {
  answer.classList.add(match ? 'match' : 'no-match');
  answer.classList.remove(match ? 'no-match' : 'match');
  answer.textContent = match ? 'Match' : 'No match';
}

function compareInputWithRegexp(inputText) {
  // const regexp = getRegexp();
  if (regexp instanceof RegExp) {
    return regexp.test(inputText);
  } else {
    return false
  }
}

function getRegexp() {
  try {
    const regexpElem = document.getElementById('regexp');
    return new RegExp(`^${regexpElem.value}$`)
  } catch (error) {
    return null;
  }
}

function renderTask(sampleData) {
  const regexpElem = document.querySelector('#regexp');
  const description = document.getElementById('description');
  const samplesElem = document.querySelector('.samples');
  regexpElem.value = '';
  description.textContent = sampleData.description;
  
  sampleData.samples.forEach(sampleText => {
    const sampleTemplate = `
      <div class="sample">
        <input type="text" class="regexp-input" placeholder="Sample" value="${sampleText}">
        <div class="answer no-match">No match</div>
      </div>
    `
    samplesElem.insertAdjacentHTML('beforeend', sampleTemplate);
  })
}

function getDataFromServer(url) {
  if (typeof url === 'string') {
    return fetch(url);
  } else {
    return Promise.reject('Unvalid URL');
  }
}

// try {
//   // const naVariable = null;
//   // naVariable.value = 'Hello'
//   throw new Error('You must die!');
//   console.log('Hey')
// } catch (error) {
//   console.error(error);
//   console.log('I\'m alive!')
// }

// function delay(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve();
//     }, ms);
//   })
// }

// delay(2000).then(() => {
//   console.log('Step 1')
//   return delay(1000)
// })
// .then(() => {
//   console.log('Step 2')
//   return delay(1000)
// })
// .then(() => {
//   console.log('Step 3')
//   return delay(1000)
// })
// .then(() => {
//   console.log('Step 4')
//   return delay(1000)
// })

// // const promise = new Promise((resolve, reject) => {
// //   setTimeout(() => {
// //     resolve('Step 1');
// //   }, 2000);
// // })

// // promise.then(result => {
// //   console.log(result);
// //   return 'Step 2'
// // }).then(result => {
// //   console.log(result);
// // })

// // setTimeout(() => {
// //   console.log('One');
// //   getDataFromServer(url, () => {
// //     sendDataToLocaleDB(data, (result) => {
// //       sendDataToExternalService(data, (response) => {
// //         logingDataToDB(response.body(), (result) => {

// //         })
// //       })
// //     })
// //   })
// // }, 1000);

// console.log('Two');


// // let counter = 0;
// // setInterval(() => {
// //   console.log(counter++)
// // }, 1000)

// function createWatch() {
//   const getTime = () => (new Date()).toLocaleTimeString();
//   let time = getTime();
//   const watchNode = document.createTextNode(time);
//   document.body.appendChild(watchNode);
//   setInterval(() => {
//     watchNode.nodeValue = getTime();
//   }, 1000)
// }




// // function goDown() {
// //   document.querySelector('.down').scrollIntoView({
// //     behavior: "smooth",
// //     block: "start",
// //   });
// //   // const {top} = document.querySelector('.down').getBoundingClientRect();
// //   // window.scroll({top, left: 0, behavior: 'smooth' });
// // }