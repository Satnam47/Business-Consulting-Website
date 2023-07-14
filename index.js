// logo
const logo = document.querySelector('.logo');
logo.addEventListener('click', () => {
	location.href = '/';
});
// burger menu
$(document).ready(function () {
	$('#burger').click(function () {
		$(this).toggleClass('open');
		$('.nav-links-container').toggleClass('open');
		$('body').toggleClass('fixed');
	});
});

// Name on image
$(window).resize(function () {
	if (window.innerWidth > 920) {
		$('.intro-name').html(`<pre>Hi,
I'm Dominic</pre>`);
	} else {
		$('.intro-name').html(`<pre>Hi,
I'm 
Dominic</pre>`);
	}
});

// carousel
const makeCarousel = () => {
	const slides = document.getElementsByClassName('testimonial-card');
	const nextBtn = document.getElementById('test-next');
	const prevBtn = document.getElementById('test-prev');
	let curSlide = 0;

	const switchSlides = (currentSlide, nextSlide) => {
		currentSlide.classList.remove('active');
		nextSlide.classList.add('active');
	};

	nextBtn.addEventListener('click', () => {
		if (curSlide < slides.length - 1) {
			const currentSlide = slides[curSlide];
			const nextSlide = slides[curSlide + 1];
			switchSlides(currentSlide, nextSlide);
			curSlide++;
		} else {
			curSlide = 0;
			const currentSlide = slides[slides.length - 1];
			const nextSlide = slides[curSlide];
			switchSlides(currentSlide, nextSlide);
		}
	});

	prevBtn.addEventListener('click', () => {
		if (curSlide > 0) {
			const currentSlide = slides[curSlide];
			const nextSlide = slides[curSlide - 1];
			switchSlides(currentSlide, nextSlide);
			curSlide--;
		} else {
			const nextSlide = slides[slides.length - 1];
			const currentSlide = slides[curSlide];
			switchSlides(currentSlide, nextSlide);
			curSlide = slides.length - 1;
		}
	});

	const images = [
		'/assets/img/woman.png',
		'/assets/img/woman2.png',
		'/assets/img/man.png',
	];
	const cards = document.getElementsByClassName('card');
	Array.from(cards).forEach((elem, i) => {
		return (elem.firstElementChild.style.backgroundImage =
			'url(' + images[i] + ')');
	});
};
if (document.querySelector('.testimonial-card')) makeCarousel();

// getting actors images with TMDb
let baseURL = 'https://api.themoviedb.org/3';

let url = baseURL + '/search/movie?api_key=' + APIKEY + '&query=Fast Furious 6';
let movieId, teamMembers;

function handleError(err) {
	console.log(`This is the error: ${err}`);
}
async function getMovieId(url) {
	const response = await fetch(url);
	const data = await response.json();
	movieId = data.results[0].id;
	return movieId;
}

async function createTeam() {
	const movieId = await getMovieId(url).catch(handleError);
	const response = await fetch(
		baseURL + '/movie/' + movieId + '/credits?api_key=' + APIKEY
	);
	const data = await response.json();
	let casts = data.cast.slice(0, 8);

	teamMembers = casts.map((cast) => ({
		fullName: cast.character,
		imageURL: 'https://image.tmdb.org/t/p/w185/' + cast.profile_path,
		firstName: cast.character.split(' ')[0],
	}));

	// add photos and description to about me page

	const teamContainer = document.querySelector('.team-members-container');
	function createMemberCard(
		imgURL,
		name,
		title = 'Title',
		description = 'Missing'
	) {
		const cardElement = document.createElement('div');
		cardElement.classList.add('team-member-card');
		cardElement.innerHTML = `
	<div class="member-img">
		<figure>
			<img
				src="${imgURL}"
			/>
		<figcaption>${name}</figcaption>
		</figure>
	</div>
	<span>${title}</span>
	<p class="about-member">
		${description}
	</p>
	`;
		teamContainer.appendChild(cardElement);
	}
	if (teamContainer) {
		const membersInfo = {
			Dominic: {
				title: 'Team Leader',
				description:
					'Dominic is a superb racer with a strong mentality. A merciful fighter and the brains behind the plans.',
			},
			Mia: {
				title: 'Team HR',
				description:
					'Mia is a core part of the family. She is heading the HR team and provide support moral support to those on the ground.',
			},
			Brian: {
				title: 'Co-Leader',
				description:
					'As an ex-cop, Brian is our liasion working with law enforcement to ensure that we stay on the right side of the law.',
			},
			Luke: {
				title: 'Juggernaut',
				description:
					'Luke is an FBI agent who provides support for the Crew. He is a great leader with great combat experience and a valued asset to the Crew.',
			},
			Leticia: {
				title: 'Co-Leader',
				description:
					'Letty ride side-by-side with Dominic, she possess the skills in hand to hand combat and is a solid rider.',
			},
			Gisele: {
				title: 'Marksman',
				description:
					'A wonderful woman who oozes confidence. She is a master of beauty and deception.',
			},
			Han: {
				title: 'Drift King',
				description:
					'Han grew up in the streets of Tokyo where racing has shaped him to be an extremely top tier driver.',
			},
			Roman: {
				title: 'Wildcard',
				description:
					'Roman always provides laughter to the team, a jack of all trades who is wonderful with words.',
			},
		};
		teamMembers.forEach((member) =>
			createMemberCard(
				member.imageURL,
				member.fullName,
				membersInfo[member.firstName].title,
				membersInfo[member.firstName].description
			)
		);
	}
}

async function getImage() {
	const response = await fetch(
		baseURL +
			'/search/person?api_key=' +
			APIKEY +
			'&query=Vin%20Diesel&page=1&include_adult=false'
	);

	const vinDeisel = await response.json();
	const profile = await fetch(
		baseURL + '/person/' + vinDeisel.results[0].id + '/images?api_key=' + APIKEY
	);
	const profileImg = await profile.json();
	console.log(profileImg);
}
const headshot = document.querySelector('.headshot-container');
if (headshot) {
	headshot.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/dZ0aCQV3Zoudk0L3QAlBPHz5HrR.jpg)`;
}

document.addEventListener('DOMContentLoaded', createTeam);

// cv button

$('#custom-upload span[role=button]').bind('keypress keyup', function (e) {
	if (e.which === 32 || e.which === 13) {
		e.preventDefault();
		$('#cv-upload').click();
	}
});

// date minimum
const today = new Date();
function formatDate(date) {
	const year = date.getFullYear();
	let month = date.getMonth() + 1;
	month < 10 ? (month = '0' + month) : month;
	let day = date.getDate();
	day < 10 ? (day = '0' + day) : day;
	return `${year}-${month}-${day}`;
}
$('input[type=date]').attr('min', formatDate(today));
