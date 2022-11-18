const heroesList = `[{
		"id": "iron",
		"hero": "Железный человек",
		"name": "Тони Старк",
		"image": "https://n1s1.hsmedia.ru/7b/56/08/7b5608ec3df83d872fa1162fb9e32f28/547x397_0xac120002_1773711401540468871.jpg",
		"power": "бронекостюм, высокий уровень интеллекта, широкие познания науки и техники",
		"descr": "Cамый популярный современный супергерой. Железный Человек не всегда ходил в красном модном костюме: в своих первых версиях 1963 года он был скромного серого цвета"
	},
	{
		"id": "spider",
		"hero": "Человек-паук",
		"name": "Питер Паркер",
		"image": "https://n1s1.hsmedia.ru/37/39/74/373974effcc7ccd093d849e8fa062091/547x397_0xac120002_9548247751540468871.jpg",
		"power": "сверхчеловеческие рефлексы, «паучье чутье», способность прилепляться к твердым поверхностям, производство паутины",
		"descr": "Питер не сразу использовал свои силы во благо людей: изначально он хотел делать на них деньги, участвуя в нелегальных боях без правил. Затем его любимый дядя Бен умер от рук грабителя, и подросток поклялся, что очистит свой родной Нью-Йорк ото зла. Однако спустя время подросток понял, что одной клятвы недостаточно и что «с великой силой приходит великая ответственность»."
	},
	{
		"id": "captain",
		"hero": "Капитан Америка",
		"name": "Стивен Роджерс",
		"image": "https://n1s1.hsmedia.ru/41/8f/05/418f050c767eeca8854b328914c7bccc/547x397_0xac120002_20106541761540468871.jpg",
		"power": "сила, выносливость, бессмертие, быстрая регенерация, мастерство скрытности и боя",
		"descr": "По воле судьбы Стивену предложили принять участие в секретном оборонном проекте, целью которого было создание суперсолдат. Несмотря на сложности во время эксперимента, результат был успешным. Роджерс превратился из хилого юноши в настоящего Аполлона"
	},
	{
		"id": "widow",
		"hero": "Черная вдова",
		"name": "Наташа Романофф",
		"image": "https://n1s1.hsmedia.ru/e0/2b/55/e02b55b147eeaff9b3fe6bdbb36ff9ea/547x397_0xac120002_744074131540468872.jpg",
		"power": "пик человеческого физического потенциала, замедленное старение, знание многих языков",
		"descr": "Супергероиня российского происхождения родилась предположительно в 1928 году в Сталинграде. Во время Второй мировой войны она потеряла родителей и была спасена из горящего дома советским солдатом. Тот на некоторое время стал ее опекуном. Повзрослев, Наташа попала в организацию «Красная Комната». Там же ей вживили сыворотку Суперсолдата. Благодаря ей Наташа может использовать максимальные возможности своего организма: силу, гибкость, скорость, ловкость и т. д. Также сыворотка дает эффект замедленного старения."
	}
]`;

//=======================================
document.addEventListener('DOMContentLoaded', () => {
	const container = document.querySelector('.container');
	const heroes = JSON.parse(heroesList);

	renderCard();

	function renderCard() {
		let content = '';
		for (let hero of heroes) {
			content += `<div class="hero">
				<img
					src=${hero.image}
					alt=${hero.hero}
					class="hero__img"
				/>
				<h2 class="hero__title">${hero.hero}</h2>
				<button class="hero__btn btn-reset">Подробнее</button>
				<div class="hidden-info hide">
						<h3 class="hidden-info__subtitle">${hero.name}</h3>
						<p class="hidden-info__subtitle">
							<span>Суперсилы: </span>${hero.power}
						</p>
						<p class="hidden-info__descr">
						<span>Про героя: </span>
							${hero.descr}
						</p>
						<form class="rating" id=${hero.id}>
							<div class="rating__title">Рейтинг</div>
							<span class="rating__type">
								<label for="1">1</label>
								<input type="radio" name="rating" value="1" id="1">
							</span>
							<span class="rating__type">
								<label for="2">2</label>
								<input type="radio" name="rating" value="2" id="2">
							</span>
							<span class="rating__type">
								<label for="3">3</label>
								<input type="radio" name="rating" value="3" id="3">
							</span>
							<span class="rating__type">
								<label for="4">4</label>
								<input type="radio" name="rating" value="4" id="4">
							</span>
							<span class="rating__type">
								<label for="5">5</label>
								<input type="radio" name="rating" value="5" id="5">
							</span>
						</form>
					</div>
				</div>`;

			container.innerHTML = content;
		}
	}

	const buttons = document.querySelectorAll('.hero__btn'),
		hiddenInfos = document.querySelectorAll('.hidden-info');

	function getInfo(btn, hiddenInfo) {
		btn.addEventListener('click', () => {
			hiddenInfo.classList.toggle('hide');
		});
	}

	for (let i = 0; i < buttons.length; i++) {
		getInfo(buttons[i], hiddenInfos[i]);
	}

	const ratingInputs = document.querySelectorAll('input');
	let userRatingArr = [];

	if (localStorage.getItem('userRating') !== null) {
		const forms = document.querySelectorAll('form');
		const localRating = JSON.parse(localStorage.getItem('userRating'));

		for (let i = 0; i < buttons.length; i++) {
			setRating(localRating[i], forms[i]);
		}
	}

	function setRating(rate, form) {

		let ratingContent = '';
		ratingContent += `
		<div>
			<p class="rating-user"><span>Ваш рейтинг:</span> ${rate}</p>
		</div>
		`;

		const add = document.createElement('div');
		add.innerHTML = ratingContent;
		form.append(add);
	}

	function getRating() {
		ratingInputs.forEach(ratingInput => {
			ratingInput.addEventListener('change', () => {
				if (ratingInput.checked) {
					userRatingArr.push(ratingInput.value);
					if (userRatingArr.length < 5) {
						const userRatingInfo = JSON.stringify(userRatingArr);
						localStorage.setItem('userRating', userRatingInfo);
					}
				}
			});
		});
	}

	getRating();
});