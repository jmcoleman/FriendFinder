// const NAME_REQUIRED = 'Please enter your name'
// const PHOTO_REQUIRED = 'Please enter the url to your photo'
// const RESPONSE_REQUIRED = 'Please enter a response to the question.'
const surveyForm = document.getElementById('friend-survey')

// const validateForm = () => {
// 	// validate the form
// 	let isValid = true

// 	// check that the name is valid
// 	const name = document.getElementById('name')
// 	if (name.value == '') isValid = false

// 	// check that the photo url is valid
// 	const photo = document.getElementById('photo')
// 	if (photo.value == '') isValid = false

// 	// check that all questions are answered
// 	document.querySelectorAll('.ques').forEach((el) => {
// 		if (!(el.value >= 1 && el.value <= 5)) isValid = false
// 	})

// 	return isValid
// }

function surveySubmit() {
	// stop form submission
	event.preventDefault()

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

	// if form is not valid return without submitting the form to save
	// if (!validateForm) return
	return

	const friend = {
		name: name.value,
		photo: photo.value,
		score: [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10],
	}

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
			document.getElementById('match-name').text(data.name)
			document.getElementById('match-img').setAttribute('src', data.photo)

			// Show the modal with the best match
			document.querySelector('#results-modal').modal('toggle')

			// clear the form
			surveyForm.reset()

			// set the focus
			surveyForm['q1'].focus()
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
