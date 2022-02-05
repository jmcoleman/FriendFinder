const surveyForm = document.getElementById('friend-survey')

// validate the form
const validateForm = () => {
	let isValid = true

	// check that the name is valid
	const name = document.getElementById('name')
	if (name.value.trim() == '') {
		setFieldInvalid(name, 'Name is required')
		isValid = false
	} else {
		setFieldValid(name, 'Valid value')
	}

	// check that the photo url is valid
	const photo = document.getElementById('photo')
	let expression =
		/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
	let regex = new RegExp(expression)
	// console.log(`Value: ${photo.value.trim().match(regex)}`)
	if (photo.value.trim() == '') {
		setFieldInvalid(photo, 'Photo url is required')
		isValid = false
	} else if (photo.value.trim().match(regex) == null) {
		setFieldInvalid(photo, 'Invalid url')
		isValid = false
	} else {
		setFieldValid(photo, 'Valid value')
	}

	// check that all questions are answered
	document.querySelectorAll('.ques').forEach((el) => {
		if (!(el.value >= 1 && el.value <= 5)) {
			setFieldInvalid(el, 'Select a value')
			isValid = false
		} else {
			setFieldValid(el, 'Valid value')
		}
	})

	return isValid
}

const setFieldInvalid = (el, msg) => {
	// console.log(`in setFieldInvalid for ${el.id} ...`)
	el.classList.remove('error', 'success')
	el.classList.add('error')
	spanEl = el.nextElementSibling.querySelector('span')
	spanEl.classList.remove('error', 'text-danger', 'success', 'text-success')
	spanEl.classList.add('error', 'text-danger')
	spanEl.innerText = msg || 'Invalid value'
}

const setFieldValid = (el, msg) => {
	// console.log(`in setFieldValid for ${el.id} ...`)
	el.classList.remove('error', 'success')
	el.classList.add('success')
	spanEl = el.nextElementSibling.querySelector('span')
	spanEl.classList.remove('error', 'text-danger', 'success', 'text-success')
	spanEl.classList.add('success', 'text-success')
	spanEl.innerText = msg || 'Valid value'
}

// validate and save the survey
function surveySubmit(e) {
	// stop form submission
	console.log('in surveySubmit')
	e.preventDefault()

	const name = document.getElementById('name')
	const photo = document.getElementById('photo')
	const q1 = surveyForm['q1']
	const q2 = surveyForm['q2']
	const q3 = surveyForm['q3']
	const q4 = surveyForm['q4']
	const q5 = surveyForm['q5']
	const q6 = surveyForm['q6']
	const q7 = surveyForm['q7']
	const q8 = surveyForm['q8']
	const q9 = surveyForm['q9']
	const q10 = surveyForm['q10']

	// if form is not valid, return without submitting the form
	if (!validateForm()) return

	const friend = {
		name: name.value
			.trim()
			.toLowerCase()
			.replace(/^\w/, (c) => c.toUpperCase()),
		photo: encodeURIComponent(photo.value.trim().toLowerCase()),
		scores: [
			q1.value,
			q2.value,
			q3.value,
			q4.value,
			q5.value,
			q6.value,
			q7.value,
			q8.value,
			q9.value,
			q10.value,
		],
	}

	console.log(JSON.stringify(friend))

	// Send the POST request.
	fetch(`/api/friends`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(friend),
	})
		.then((response) => response.json())
		.then((data) => {
			// clear the form
			const inputs = surveyForm.querySelectorAll('input')
			// console.log(`inputs: ${JSON.stringify(inputs)}`)
			inputs.forEach((el) => {
				console.log(`el.classlist: ${el.classList}`)
				el.classList.remove('success')

				const spanEl = el.parentElement.querySelector('small > span')
				spanEl.classList.remove('success', 'text-success')
				spanEl.innerText = ''
			})
			const selections = surveyForm.querySelectorAll('select')
			// console.log(`selection: ${JSON.stringify(selections)}`)
			selections.forEach((el) => {
				el.classList.remove('success')

				const spanEl = el.parentElement.querySelector('small > span')
				spanEl.classList.remove('success', 'text-success')
				spanEl.innerText = ''
			})

			surveyForm.reset()

			// set the focus
			surveyForm[0].focus()

			// SHOW MODAL
			// document.getElementById('match-name').innerText = data.name
			// document.getElementById('match-img').setAttribute('src', data.photo)

			// Show the modal with the best match
			document.querySelector('#results-modal').classList.add('show')
		})
		.catch((error) => {
			console.error('Error:', error)
		})
}

function init() {
	const questions = document.querySelectorAll('.ques')
	questions.forEach((q) => {
		q.classList.add('w-50')
	})

	surveyForm.addEventListener('submit', surveySubmit)
}

if (document.readyState == 'loading') {
	// still loading, wait for the event
	document.addEventListener('DOMContentLoaded', init)
} else {
	// DOM is ready!
	init()
}

// // Chosen CSS
// var config = {
// 	'.chosen-select': {},
// 	'.chosen-select-deselect': {
// 		allow_single_deselect: true,
// 	},
// 	'.chosen-select-no-single': {
// 		disable_search_threshold: 10,
// 	},
// 	'.chosen-select-no-results': {
// 		no_results_text: 'Oops, nothing found!',
// 	},
// 	'.chosen-select-width': {
// 		width: '95%',
// 	},
// }

// for (var selector in config) {
// 	$(selector).chosen(config[selector])
// }

// // Capture the form inputs
// $('#submit').on('click', function (event) {
// 	event.preventDefault()

// 	// Form validation
// 	function validateForm() {
// 		var isValid = true

// 		$('.form-control').each(function () {
// 			if ($(this).val() === '') {
// 				isValid = false
// 			}
// 		})

// 		$('.chosen-select').each(function () {
// 			if ($(this).val() === '') {
// 				isValid = false
// 			}
// 		})
// 		return isValid
// 	}

// 	// If all required fields are filled
// 	if (validateForm()) {
// 		// Create an object for the user"s data
// 		var userData = {
// 			name: $('#name').val(),
// 			photo: $('#photo').val(),
// 			scores: [
// 				$('#q1').val(),
// 				$('#q2').val(),
// 				$('#q3').val(),
// 				$('#q4').val(),
// 				$('#q5').val(),
// 				$('#q6').val(),
// 				$('#q7').val(),
// 				$('#q8').val(),
// 				$('#q9').val(),
// 				$('#q10').val(),
// 			],
// 		}

// 		// AJAX post the data to the friends API.
// 		$.post('/api/friends', userData, function (data) {
// 			// Grab the result from the AJAX post so that the best match's name and photo are displayed.
// 			$('#match-name').text(data.name)
// 			$('#match-img').attr('src', data.photo)

// 			// Show the modal with the best match
// 			$('#results-modal').modal('toggle')
// 		})

// 		////////////////////////
// 		// clear the form
// 		////////////////////////
// 		$('.form-control').each(function () {
// 			this.value = ''
// 		})
// 		//clears all fields after submit similar to a form reset but for use with CHOOSEN
// 		$('.chosen-select').val('').trigger('chosen:updated')
// 	} else {
// 		alert('Please fill out all fields before submitting!')
// 	}
// })
