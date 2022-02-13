const surveyForm = document.getElementById('friend-survey')
const surveySubmitBtn = document.getElementById('submit-survey')
const resultsModal = document.getElementById('results-modal')

const bsModal = new bootstrap.Modal(resultsModal, {
	backdrop: 'static',
	keyboard: true,
	// focus: true,
})

// validate the form
const validForm = () => {
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

	// console.log('isValid:', isValid)
	return isValid
}

const setFieldInvalid = (el, msg) => {
	el.classList.remove('error', 'success')
	el.classList.add('error')
	spanEl = el.nextElementSibling.querySelector('span')
	spanEl.classList.remove('error', 'text-danger', 'success', 'text-success')
	spanEl.classList.add('error', 'text-danger')
	spanEl.innerText = msg || 'Invalid value'
}

const setFieldValid = (el, msg) => {
	// clear the original validations
	el.classList.remove('error', 'success')
	spanEl = el.nextElementSibling.querySelector('span')
	spanEl.classList.remove('error', 'text-danger', 'success', 'text-success')
	spanEl.innerText = ''

	// Show field with success
	// el.classList.add('success')
	// spanEl.classList.add('success', 'text-success')
	// spanEl.innerText = msg || 'Valid value'
}

const clearSurveyForm = () => {
	const inputs = surveyForm.querySelectorAll('input')
	const selections = surveyForm.querySelectorAll('select')

	// clear the form
	inputs.forEach((el) => {
		// console.log(`el.classlist: ${el.classList}`)
		el.classList.remove('success')

		const spanEl = el.parentElement.querySelector('small > span')
		spanEl.classList.remove('success', 'text-success')
		spanEl.innerText = ''
	})
	selections.forEach((el) => {
		el.classList.remove('success')

		const spanEl = el.parentElement.querySelector('small > span')
		spanEl.classList.remove('success', 'text-success')
		spanEl.innerText = ''
	})

	// reset the form and set the focus
	surveyForm.reset()
	surveyForm[0].focus()
	return
}

// validate and save the survey
function surveySubmit(e) {
	// stop form submission
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
	if (!validForm()) {
		let errorFields = surveyForm.getElementsByClassName('error')
		// console.log('Invalid form ', errorFields[0])
		errorFields[0].focus()
		return false
	}

	const friend = {
		name: name.value.trim().replace(/^\w/, (c) => c.toUpperCase()),
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

	// console.log(`Friend to be saved on servers is: ${JSON.stringify(friend)}`)

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
			// console.log(`Returned data from api is: ${JSON.stringify(data)}`)

			clearSurveyForm()

			// set the fields for the modal and show it
			document.getElementById('match-name').innerText = data.bestMatch.name
			document
				.getElementById('match-img')
				.setAttribute('src', data.bestMatch.photo)
			document.getElementById('compatibility-score').innerHTML =
				data.bestMatch.score
			document.getElementById('nbr-more-friends').innerText =
				data.bestMatch.moreFriends
			bsModal.show()
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

	// ADD EVENT LISTENERS
	resultsModal.addEventListener('shown.bs.modal', () => {
		// set the focus to the close button when modal opens
		const closeBtn = document.getElementById('match-result-btn')
		closeBtn.focus()
	})

	resultsModal.addEventListener('hidden.bs.modal', () => {
		surveyForm[0].focus()
	})

	surveyForm.addEventListener('submit', surveySubmit)

	surveySubmitBtn.addEventListener('click', () => {
		// console.log('the surveySubmitBtn btn click fired')
	})
}

if (document.readyState == 'loading') {
	// still loading, wait for the event
	document.addEventListener('DOMContentLoaded', init)
} else {
	// DOM is ready!
	init()
}
