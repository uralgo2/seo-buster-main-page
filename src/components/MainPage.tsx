import '../styles/main.css'
import {Link} from "react-router-dom";
import VulkanMobileSVG from '../svg/vulkan_mobile.svg'
import VulkanSVG from '../svg/vulkan.svg'
import Gear from '../images/Gear.png'
import PaperPlain from '../images/PaperPlain.png'
import SandHours from '../images/SandHours.png'
import CaseImage from '../svg/Case.svg'
import RegionMark from '../svg/RegionMark.svg'
import TargetMark from '../svg/TargetMark.svg'
import Social from '../svg/Social.svg'
import Avatar from '../images/Avatar.png'
import LeftBubble from '../images/LeftBubble.png'
import RightBubble from '../images/RightBubble.png'
import RightUpBubble from '../images/RightUpBubble.png'
import PlayerButtonStart from '../svg/PlayerButtonStart.svg'
import PlayerArrow from '../svg/PlayerArrow.svg'
import Card from '../svg/Card.svg'
import Notebook from '../svg/Notebook.svg'
import Shield from '../svg/Shield.svg'
import Lamp from '../svg/Lamp.svg'
import Glass from '../svg/Glass.svg'
import Graph from '../svg/Graph.svg'
import Backpack from '../svg/Backpack.svg'
import UserAvatar from '../svg/UserAvatar.svg'
import VKIcon from '../svg/VKIcon.svg'
import TelegramIcon from '../svg/TelegramIcon.svg'
import YouTubeIcon from '../svg/YouTubeIcon.svg'
import CalcLeftBubble from '../images/CalcLeftBubble.png'
import CalcRightBubble from '../images/CalcRightBubble.png'
import CalcLeftUpBubble from '../images/CalcLeftUpBubble.png'

import {ChangeEvent, TouchEvent, useCallback, useEffect, useState} from "react";

interface ISlider<T> {
    slideNext: () => void
    slideBack: () => void
    get index(): number
    get current(): T
}

class Slider<T> implements ISlider<T> {
    private _index = 0
    private readonly _data: T[]

    constructor(data: T[]) {
        this._data = data
    }

    public get current() {
        return this._data[this._index];
    }

    public get index() {
        return this._index
    }

    public slideBack(): void {
        this._index = this.limit(this._index - 1, 0, this._data.length)
    }

    public slideNext(): void {
        this._index = this.limit(this._index + 1, 0, this._data.length)
    }

    private limit (num: number, min: number, max: number): number {
        if(num < min) return min
        else if(num >= max) return max-1

        return num
    }
}

interface Review {

}

interface Case {

}

const reviews = new Array<Review>({}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {})
const cases = new Array<Case>({}, {}, {}, {}, {}, {}, {})

export default function MainPage(){
    const [modalOpen, setModalOpen] = useState(false)
    const [calculatorInputValue, setCalculatorInputValue] = useState(7150)
    const [calculatedResult, setCalculatedResult] = useState(10000)
    const [reviewsSlider, setReviewsSlider] = useState<Slider<Review>>(new Slider(reviews))
    const [casesSlider, setCasesSlider] = useState<Slider<Case>>(new Slider(cases))
    const [, updateState] = useState<{}>()
    const forceUpdate = useCallback(() => updateState({}), [])
    const [touchPosition, setTouchPosition] = useState<number | null>(null)
    const [touchHandled, setTouchHandled] = useState(false);
    const [lastTouchPosition, setLastTouchPosition] = useState<number | null>(null)
    const isMobile = window.matchMedia("(max-width: 768px)").matches

    const onInputCalculator = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const value = Number(target.value) || 0


        setCalculatorInputValue(value)

        if(target.type == 'range'){
            const max = Number(target.max)
            const min = Number(target.min)

            target.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%'
        }
    }

    const openModal = (cls: 'register-modal' | 'login-modal' | 'youtube-player-modal') => {
        setModalOpen(!modalOpen)

        document.querySelector(`.${cls}`)!
            .classList.toggle('opened')
        document.querySelector('.modal-background')!
            .classList.toggle('opened')
        document.querySelector('body')!
            .classList.toggle('opened')
    }

    const closeModal = () => {
        setModalOpen(false)

        document.querySelector(`.register-modal`)
            ?.classList.remove('opened')
        document.querySelector(`.login-modal`)
            ?.classList.remove('opened')
        document.querySelector(`.youtube-player-modal`)
            ?.classList.remove('opened')
        document.querySelector('.modal-background')!
            .classList.remove('opened')
        document.querySelector('body')!
            .classList.remove('opened')
    }

    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const handleTouchEnd = (next: () => void, back: () => void): (e: TouchEvent) => void => {
        return () => {
            if (touchPosition === null || lastTouchPosition === null)
                return

            const diff = touchPosition - lastTouchPosition

            if (diff > 5)
                next()
            else if(diff < -5)
                back()
        }
    }

    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        if (touchPosition === null) {
            return
        }

        const curr = e.touches[0].clientX

        if(curr !== null)
            setLastTouchPosition(curr)
    }

    useEffect(() => {
        const details = document.querySelectorAll("details")!

        details.forEach((targetDetail) => {
            targetDetail.addEventListener("click", _ => {
                details.forEach((detail) => {
                    if (detail !== targetDetail) {
                        detail.removeAttribute("open")
                    }
                })
            })
        })
    })

    const hide = (id: string) => {
        const elem = document.getElementById(id) as HTMLInputElement

        elem.type = elem.type == 'password' ? 'text' : 'password'

        document.querySelector(`#${id} + .hide`)!.classList.toggle('hidden')
    }

    const makeHideFunction = (id: string) => () => hide(id)

    const handleCasesTouchEnd = useCallback(handleTouchEnd(() => {
        casesSlider.slideNext()
        forceUpdate()
    }, () => {
        casesSlider.slideBack()
        forceUpdate()
    }), [touchPosition, lastTouchPosition])

    const handleReviewsTouchEnd = useCallback(handleTouchEnd(() => {
        reviewsSlider.slideNext()
        forceUpdate()
    }, () => {
        reviewsSlider.slideBack()
        forceUpdate()
    }), [touchPosition, lastTouchPosition])

    return <>
        <div className='main'>
            <header className='main-header-wrapper'>
                <div className='main-header'>
                    <div className='menu-open'></div>
                    <div className='heading'>
                        <span className='_header'>SEO Бустер</span>
                        <span className='_sub-header'>когда белое SEO не работает</span>
                    </div>

                    <div className='links'>
                        <a href='#reviews'>Отзывы</a>
                        <a href='#'>Как работает</a>
                        <a href='#tariff'>Цены</a>
                        <a href='#faq'>Частые вопросы</a>
                    </div>

                    <div className='auth'>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.5 18.5C4.5 18.5 8 17 9 16C10 15 7 15 7 10C7 5 11 5 11 5C11 5 15 5 15 10C15 15 12 15 13 16C14 17 17.5 18.5 17.5 18.5M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="#595B62" stroke-linecap="round"/>
                        </svg>

                        <a href='#' onClick={() => openModal('register-modal')}>Регистрация</a>
                        <span>/</span>
                        <a href='#' onClick={() => openModal('login-modal')}>Вход</a>
                    </div>
                </div>
            </header>
            <main>
                <div className='introduction'>
                    <h1>
                        Автоматический сервис<br/>
                        по поведенческим факторам
                    </h1>

                    <p>
                        Взрывной рост сайта в <span className='orange bold'>Яндексе</span> по конкурентной нише за 12 дней
                    </p>

                    <div className='flex-row buttons'>
                        <a href='#tariff'><button className='button orange-button calculate-button'>Рассчитать стоимость</button></a>
                        <button className='button peach-button add-site-button'>Добавить сайт</button>
                    </div>
                </div>
                <div className='why-service'>
                    <h1>Зачем сервис</h1>
                    <div className='container'>
                        <div className='item'>
                            <img className='gear-image' src={Gear}/>
                            <div>
                                <h3>Автоматизация рутины</h3>
                                <span>Достаточно загрузить запросы и выбрать режим.</span>
                            </div>
                        </div>
                        <div className='item'>
                            <img className='sand-hours-image' src={SandHours}/>
                            <div>
                                <h3>Экономия времени</h3>
                                <span>Не у всех есть время, желание на эксперименты и анализ. </span>
                            </div>
                        </div>
                        <div className='item'>
                            <img className='paper-plain-image' src={PaperPlain}/>
                            <div>
                                <h3>Сразу получить все наработки нашей команды</h3>
                                <span>Вы всегда будете с актуальным инструментом, в который добавляем новые найденые рабочие механики.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='cases'>
                    <h1>Свежие кейсы</h1>
                    <div className='container'
                         onTouchStart={isMobile ? handleTouchStart : undefined}
                         onTouchMove={isMobile ? handleTouchMove : undefined}
                         onTouchEnd={isMobile ? handleCasesTouchEnd : undefined}
                    >
                        <div className='case-container'>
                            <img src={CaseImage}/>
                            <p>Динамика роста отображена на графике (на графике средний позиции)</p>
                        </div>
                        <div className='comment'>
                            <div>
                                <img src={RegionMark}/>
                                <span>
                                    Регион: <strong>Москва</strong>
                                </span>
                            </div>
                            <div>
                                <img src={TargetMark}/>
                                <span>
                                    Ниша: <strong>Грузоперевозки</strong>
                                </span>
                            </div>
                            <div>
                                <p>
                                    Ещё парочка дней и по проекту красота - заиграло красками &#128521;
                                    <br/><br/>
                                    Как можно заметить в ТОП зашли практически все запросы. 50% в топ-5, что является крутым результатом, за столь короткий промежуток времени
                                </p>
                            </div>
                            <div>
                                <button onClick={() => {
                                    casesSlider.slideBack()
                                    forceUpdate()
                                }}>
                                    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 17L0.999999 9L9 1" stroke="#D8D9DE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>

                                <span>{casesSlider.index + 1}/{cases.length}</span>

                                <button onClick={() => {
                                    casesSlider.slideNext()
                                    forceUpdate()
                                }}>
                                    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 17L9 9L1 1" stroke="#FF5519" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className='case-container-mobile'>
                            <img src={CaseImage}/>
                            <p>Динамика роста отображена на графике (на графике средний позиции)</p>
                            <div className='dots'>
                                {
                                    cases.map((_, i) =>
                                        <div className={'dot ' + (casesSlider.index == i ? 'active' : '')}/>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div id='reviews' className='reviews'>
                    <div className='wrapper'>
                        <div className='header'>
                            <h1>Отзывы</h1>
                            <div>
                                <button onClick={() => {
                                    reviewsSlider.slideBack()
                                    forceUpdate()
                                }}>
                                    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 17L0.999999 9L9 1" stroke="#D8D9DE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>

                                <span>{reviewsSlider.index + 1}/{reviews.length}</span>

                                <button onClick={() => {
                                    reviewsSlider.slideNext()
                                    forceUpdate()
                                }}>
                                    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 17L9 9L1 1" stroke="#FF5519" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div onTouchStart={isMobile ? handleTouchStart : undefined}
                             onTouchMove={isMobile ? handleTouchMove : undefined}
                             onTouchEnd={isMobile ? handleReviewsTouchEnd : undefined}
                        >
                            <div className='bubbles'>
                                <img className='left-bubble' src={LeftBubble}/>
                                <img className='right-bubble' src={RightBubble}/>
                                <img className='right-up-bubble' src={RightUpBubble}/>
                            </div>
                            <div className='review'>

                                <div className='info'>
                                    <img className='avatar' src={Avatar}/>
                                    <div>
                                        <span className='name'>Roman Ryabov</span>
                                        <span className='mobile-date'>31 мая 2022</span>
                                    </div>
                                    <img className='social' src={Social}/>
                                    <span className='date'>31 мая 2022</span>
                                </div>
                                <p className='body'>
                                    Накрутка поведенческих факторов? Никогда и ни за что! Именно такое искаженное восприятие реальности было в моей профессиональной жизни, до тех пор, пока проекты, мно. курируемые, просто перестали расти, с трудом достигая ТОП-20 белыми технологиями (Техничка + Текстовая релевантность, LSI-вширь, LSI-вглубь и т.д.).<br/>
                                    И вот перед самым новым 2022 годом, на глаза попадается курс от Семёна по накрутке ПФ. То ли усталость от бессилия в SEO, то ли некое "шальное" праздничное настроение - но я решился. Как говорят в народе - "Глаза боятся, руки делают!"
                                </p>
                                <span className='read-more'>Читать далее...</span>
                            </div>
                            <div className='dots'>
                                {
                                    reviews.map((_, i) =>
                                        <div className={'dot ' + (reviewsSlider.index == i ? 'active' : '')}/>
                                    )
                                }
                            </div>
                        </div>

                    </div>
                </div>
                <div className='service-interface'>
                    <h1>Интерфейс сервиса</h1>
                    <span>Как за 1 минуту запустить сайт. Простой, потому понятный каждому.</span>
                    <div className='youtube-player-modal'>
                            <span className='close-modal' onClick = {
                                (e) => {
                                    openModal('youtube-player-modal')
                                }
                            }/>
                        <img className='youtube-player preview' src='https://img.youtube.com/vi/oXDwJHxIdTo/hqdefault.jpg' alt='Demo video'/>
                        <iframe frameBorder={0} allowFullScreen className='youtube-player player' src='https://youtube.com/embed/oXDwJHxIdTo'/>
                        <img onClick = {
                            (e) => {
                                openModal('youtube-player-modal')
                            }
                        }
                             src={PlayerButtonStart}
                             className='youtube-player-button'/>
                        <img className='player-arrow' src={PlayerArrow}/>
                        <text className='player-arrow-text'>посмотрите короткое видео</text>
                    </div>
                </div>
                <div id='tariff' className='tariff'>
                    <div className='wrapper'>
                        <h1>Тарифы</h1>
                        <table className='tariff-table'>
                            <thead>
                            <tr>
                                <td>Кликов в день</td>
                                <td>до 75</td>
                                <td>до 125</td>
                                <td>до 200</td>
                                <td>до 250</td>
                                <td>до 350</td>
                                <td>до 450</td>
                                <td>больше</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Цена 1 клика</td>
                                <td>0,110 ₽</td>
                                <td>0,102 ₽</td>
                                <td>0,082 ₽</td>
                                <td>0,073 ₽</td>
                                <td>0,066 ₽</td>
                                <td>0,059 ₽</td>
                                <td>0,055 ₽</td>
                            </tr>
                            </tbody>
                        </table>
                        <table className='tariff-table-mobile'>
                            <thead>
                                <tr>
                                    <th>Кликов в день</th>
                                    <th>Цена 1 клика</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>до 75</td>
                                    <td>0,110 ₽</td>
                                </tr>
                                <tr>
                                    <td>до 75</td>
                                    <td>0,102 ₽</td>
                                </tr>
                                <tr>
                                    <td>до 125</td>
                                    <td>0,082 ₽</td>
                                </tr>
                                <tr>
                                    <td>до 200</td>
                                    <td>0,073 ₽</td>
                                </tr>
                                <tr>
                                    <td>до 250</td>
                                    <td>0,066 ₽</td>
                                </tr>
                                <tr>
                                    <td>до 350</td>
                                    <td>0,059 ₽</td>
                                </tr>
                                <tr>
                                    <td>до 450</td>
                                    <td>0,055 ₽</td>
                                </tr>
                                <tr>
                                    <td>больше</td>
                                    <td>0,110 ₽</td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <div className='bubbles'>
                                <img className='left-bubble' src={CalcLeftBubble}/>
                                <img className='left-up-bubble' src={CalcLeftUpBubble}/>
                                <img className='right-bubble' src={CalcRightBubble}/>
                            </div>
                            <div className='calculator'>
                                <h1>Калькулятор цены</h1>
                                <div className='controls'>
                                    <input type='number'
                                           value={calculatorInputValue}
                                           onChange={onInputCalculator}/>
                                    <input type='range'
                                           min={0}
                                           max={32000}
                                           value={calculatorInputValue}
                                           onChange={onInputCalculator}/>

                                    <span>{calculatedResult.toLocaleString('ru-RU')} ₽</span>
                                </div>
                                <input className='mobile'
                                       type='range'
                                       min={0}
                                       max={32000}
                                       value={calculatorInputValue}
                                       onChange={onInputCalculator}/>
                                <span className='description'>Укажите сумму "Частоты" (в кавычках) всех запросов кластера</span>
                            </div>
                        </div>
                        <h1>Способы оплаты</h1>
                        <div className='payments'>
                            <div className='flex-row'>
                                <img src={Card}/>
                                <div>
                                    <span>Банковской&nbsp;картой</span>
                                    <span>VISA/MasterCart/МИР</span>
                                </div>
                            </div>
                            <div className='flex-row'>
                                <img src={Notebook}/>
                                <div>
                                    <span>По Счету (реквизитам)</span>
                                    <span>для Юридических лиц</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='capability'>
                    <h1>Кому не подходит</h1>
                    <div className='flex-row'>
                        <div className='flex-column'>
                            <img src={Glass}/>
                            <p className='head'>Не сделано базовое SEO</p>
                            <span>Без хорошего SEO, корректировка поведенческих факторов слабо работает.</span>
                            <span>Вы можете заказать у любого базовое SEO, а через сервис на автомате получить ТОП-10 </span>
                        </div>
                        <div className='flex-column'>
                            <img src={Lamp}/>
                            <p className='head'>Нужны гарантии</p>
                            <span>Сможете нам гарантировать, что качественно сделали SEO? Переменных действительно много..., чтобы давать гарантию.</span>
                            <span>Даже в сервисе можете сами запороть, не то отправить или нажать. Хотя там упрощено буквально в 1 кнопку.</span>
                        </div>
                        <div className='flex-column'>
                            <img src={Shield}/>
                            <p className='head'>Боятся бана</p>
                            <span>Если не можете провести логической цепочки, что все уже крутят и сидят долго в ТОП, то бойтесь дальше и не ищите решений.</span>
                            <span>Потому что, среди клиентов хотим видеть, здравомыслящих и думающих людей.</span>
                        </div>
                    </div>
                </div>
                <div id='faq' className='faq'>
                    <div className='wrapper'>
                        <h1>Часто задаваемые вопросы</h1>
                        <div className='details'>
                            <details open>
                                <summary>Как быстро сайт зайдет в ТОП?</summary>
                                <p>
                                    Зависит от качества оптимизации продвигаемых страниц, конкуренции в нише.<br/> В среднем:<br/><br/>
                                    Сайт без видимости (за топ-200) - 1 или 1.5 месяца<br/><br/>
                                    Сайт в ТОП-100 - 1 месяц<br/><br/>
                                    Сайт в ТОП-50 - 20 дней<br/><br/>
                                    Сайт в ТОП-30 - 14 дней<br/><br/>
                                    Сайт в ТОП-20 - 10 дней
                                </p>
                            </details>
                            <details>
                                <summary>Какие мои дальнейшие действия после запуска сайта?</summary>
                            </details>
                            <details>
                                <summary>Имеет ли смысл запускать на молодом сайте?</summary>
                                <p>
                                    Конечно, это основа любой сетки сайтов. В Яндексе за 1-1,5 месяца по любой нише в Москве можно получить ТОП. В течении месяца набирает массу и кажется, что не растет, а после резко выстреливает сразу в топ-3.
                                </p>
                            </details>
                            <details>
                                <summary>Как долго держится эффект?</summary>
                                <p>
                                    Пока применяете сервис – вечность. Из нашей практики, сетки годами находятся в ТОП.
                                </p>
                            </details>
                            <details>
                                <summary>Что такое "базовая SEO оптимизация" и зачем нужна?</summary>
                                <p>
                                    Базовая SEO оптимизация – это классические и всем известные принципы оптимизации сайта. К примеру, составление Title и h1, удаление дублей страниц, текстовая оптимизация и т.д. Поведенческие факторы, да оказывают существенное влияние, но это лишь 60% от успеха. Остальные 30% — это текстовые факторы. И смешные 10% техническая часть, в чем любят тратить много времени SEO-специалисты. Поэтому без оптимизации сайта, будет посредственный эффект. Это ключевое, на чем спотыкаются большинство.
                                </p>
                            </details>
                            <details>
                                <summary>Как не только попасть в топ-3, но уверенно держать ТОП-1?</summary>
                                <p>
                                    Улучшать сайт, как советуют в поддержке Яндекса. А именно работа над конверсиями, так как это четкий критерий качества сайта, который отвечает на потребность пользователя. Тем самым будете воздействовать на естественные поведенческие факторы, являющиеся основным фактором движения внутри топ-10 в конкретных нишах.
                                </p>
                            </details>
                            <details>
                                <summary>Как долго будет существовать данный метод продвижения?</summary>
                                <p>
                                    Всегда, пока существует Яндекс. На данном факторе основано качество поиска, без него никак.
                                </p>
                            </details>
                            <details>
                                <summary>Почему сервис только под Яндекс?</summary>
                                <p>
                                    Для Гугла отлично работают ссылки, это дешевле данного метода.
                                </p>
                            </details>
                            <details>
                                <summary>Что происходит с сайтами после прекращения?</summary>
                                <p>
                                    Из нашей практики в том числе высоко-конкурентных тематиках, если сайт хорошо оптимизирован и с хорошей конверсией (хорошие естественные поведенческие), то после выключения позиции закрепляются. В большинстве случаев, отключение приводит с возврату на прежние позиции.
                                </p>
                            </details>
                            <details>
                                <summary>Стоит ли применять для "белого" проекта?</summary>
                                <p>
                                    Да, в любой нише, которую назовете, применяется данная технология. За исключением, если у вас крупный Бренд. Если бы он у вас был, то вы бы не задавали такой вопрос, так они хорошо растут даже с базовой оптимизацией.
                                </p>
                            </details>
                            <details>
                                <summary>Что делать, если сайт не растет?</summary>
                                <p>
                                    Пишите в сапорт(поддержку) что что-то не получается. Проведем анализ сайта и дадим рекомендации по устранению. Если у вас не достаточно компетенций, вышлем ссылки на платные лекции с ответом «как устранить данную ошибку на сайте».
                                </p>
                            </details>
                        </div>
                    </div>
                </div>
                <div className='block-wrapper want-what-do'>
                    <h1>Хочу, что сделать</h1>
                    <div className='container'>
                        <div className='item'>
                            <i className='number'>1</i>
                            <img src={UserAvatar}/>
                            <p>
                                Регистрируетесь и добавляете сайт
                            </p>
                            <Link to='#' onClick={() => openModal('register-modal')} className='button'>Зарегистрироваться</Link>
                        </div>
                        <div className='item'>
                            <i className='number'>2</i>
                            <img src={Backpack}/>
                            <p>
                                Пополняете баланс и запускаете
                            </p>
                            <Link to='topup' className='button'>Пополнить баланс</Link>
                        </div>
                        <div className='item'>
                            <i className='number'>3</i>
                            <img src={Graph}/>
                            <div>
                                <p>
                                    Наслаждаетесь ростом
                                </p>
                                <span className='or'>
                                    или пишите в поддержку, мы подсказываем как улучшить

                                </span>
                            </div>
                            <Link to='support' className='button'>Задать вопрос</Link>
                        </div>
                    </div>
                </div>
            </main>

            <div className='footer'>
                <div className='wrapper'>
                    <div className='copyright'>
                        <span>SEO Бустер</span>
                        <span>когда белое SEO не работает</span>

                        <p>@ 2022 SEO Бустер - все права защищены </p>
                    </div>
                    <div className='social'>
                        <span>Дни работы поддержки</span>
                        <span>ПН-ВС 7:00-20:00 по Москве</span>
                        <span>Актуальные новости в соц.сетях</span>
                        <div>
                            <img src={VKIcon}/>
                            <img src={TelegramIcon}/>
                            <img src={YouTubeIcon}/>
                        </div>
                    </div>
                    <div className='public'>
                        <span>
                            info@seobuster.ru, +7-960-996-95-76
                        </span>
                        <a href='/pc-oferta' target='_blank'>Пользовательское соглашение</a>
                        <a href='/policy' target='_blank'>Политика оплаты и возврата</a>

                    </div>
                    <div className='mobile'>
                        <p>@ 2022 SEO Бустер - все права защищены </p>
                    </div>
                </div>
            </div>

            <div className='register-modal'>
                <div className='header'>
                    <span className='heading'>Регистрация</span>
                    <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M14 14L2 2M14 2L2 14" stroke="#D8D9DE" stroke-width="2" stroke-linecap="square"/>
                    </svg>
                </div>
                <div className='line'/>
                <input type='email' placeholder='Электронная почта'/>
                <div>
                    <input id='registerPassword' type='password' placeholder='Пароль'/>
                    <i onClick={makeHideFunction('registerPassword')} className='hide hidden'/>
                </div>
                <div>
                    <input id='registerCheckPassword' type='password' placeholder='Повторите пароль'/>
                    <i onClick={makeHideFunction('registerCheckPassword')} className='hide hidden'/>
                </div>
                <span className='nickname'>Ник в телеграмме</span>
                <input type='text' placeholder='nik_name'/>
                <span className='desk'>Для уведомлений и восстановления пароля</span>

                <label>
                    <input id='rememberMe' type='checkbox'/>
                    <span>Запомнить меня</span>
                </label>
                <button className='button orange-button'>
                    Зарегистрироваться
                </button>
                <span onClick={() => {
                    closeModal()
                    openModal('login-modal')
                }}>Я уже зарегестрирован</span>
            </div>

            <div className='login-modal'>
                <div className='header'>
                    <span className='heading'>Вход</span>
                    <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M14 14L2 2M14 2L2 14" stroke="#D8D9DE" stroke-width="2" stroke-linecap="square"/>
                    </svg>
                </div>
                <div className='line'/>
                <input type='email' placeholder='Номер или почта'/>
                <div>
                    <input id='loginPassword' type='password' placeholder='Пароль'/>
                    <i onClick={makeHideFunction('loginPassword')} className='hide hidden'/>
                </div>

                <div className='bottom'>
                    <label>
                        <input id='rememberMe' type='checkbox'/>
                        <span>Запомнить меня</span>
                    </label>
                    <span className='forget'>Забыли пароль</span>
                </div>
                <button className='button orange-button'>
                    Войти
                </button>
                <span onClick={() => {
                    closeModal()
                    openModal('register-modal')
                }}>Зарегистрироваться</span>
            </div>

            <img id='vulkanPoster' src={isMobile ? VulkanMobileSVG : VulkanSVG}/>
            <div className='background'/>
            <svg className='lavaThreadFirst' width="1124" height="380" viewBox="0 0 1124 380" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M699 43.0063C804 0 932 0 1020 0H1124C1080 49.9907 884 26.0374 786 126.019C688 226 683 308.063 549 362.053C415 416.043 102 334.049 0 301.947V203.962C142 243.955 290 282.032 416 254.037C542 226.043 594 86.0126 699 43.0063Z" fill="url(#paint0_linear_14_323)" fill-opacity="0.5"/>
                <defs>
                    <linearGradient id="paint0_linear_14_323" x1="1242" y1="-299" x2="597.884" y2="509.982" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FF6000"/>
                        <stop offset="1" stop-color="#222531" stop-opacity="0"/>
                    </linearGradient>
                </defs>
            </svg>
            <svg className='lavaThreadSecond' width="928" height="565" viewBox="0 0 928 565" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M250 392.02C178 464.722 116 513.07 0 565H460C460 565 576 529.688 616 454.908C656 380.129 652 261.005 680 172.98C708 84.9547 866 37.3897 928 0H694C616 29.683 460 48.1069 376 125.897C292 203.687 322 319.318 250 392.02Z" fill="url(#paint0_linear_14_324)" fill-opacity="0.5"/>
                <defs>
                    <linearGradient id="paint0_linear_14_324" x1="632" y1="-414.538" x2="95.3158" y2="281.452" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FF6000"/>
                        <stop offset="1" stop-color="#222531" stop-opacity="0"/>
                    </linearGradient>
                </defs>
            </svg>
            <svg className='lavaThreadThird' width="416" height="565" viewBox="0 0 416 565" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M132 92.2868C208.359 34.7418 252.065 0 252.065 0H328C280 59.4737 252.065 92.2868 212 172.269C182.341 231.476 189.204 314.444 264.065 367.096C353 429.646 396 506.552 416 565H0C96 387.604 -34 217.387 132 92.2868Z" fill="url(#paint0_linear_14_325)" fill-opacity="0.5"/>
                <defs>
                    <linearGradient id="paint0_linear_14_325" x1="106.192" y1="-256.818" x2="339.659" y2="536.916" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FF6000"/>
                        <stop offset="1" stop-color="#222531" stop-opacity="0"/>
                    </linearGradient>
                </defs>
            </svg>
            <svg className='cloud2' width="143" height="46" viewBox="0 0 143 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path style={{mixBlendMode:'multiply'}} d="M142.693 45.4389C141.103 42.3994 138.495 40.011 135.324 38.6884C132.152 37.3657 128.616 37.1922 125.33 38.198C125.33 37.9882 125.33 37.7783 125.33 37.5509C125.329 33.5165 124.172 29.5663 121.995 26.1658C119.818 22.7653 116.711 20.0563 113.042 18.358C109.372 16.6596 105.292 16.0427 101.282 16.5799C97.2727 17.1171 93.5006 18.7861 90.4106 21.3902C88.492 14.5984 84.1838 8.72328 78.2752 4.84114C72.3667 0.958991 65.2534 -0.670309 58.2383 0.251683C51.2233 1.17367 44.7762 4.58523 40.078 9.86142C35.3799 15.1376 32.7451 21.9252 32.6566 28.9808C29.486 27.329 25.9661 26.4548 22.389 26.4307C18.8119 26.4067 15.2806 27.2334 12.0879 28.8424C8.89527 30.4515 6.13329 32.7964 4.03106 35.6827C1.92884 38.569 0.546947 41.9135 0 45.4389H142.693Z" fill="url(#paint0_linear_13_318)"/>
                <defs>
                    <linearGradient id="paint0_linear_13_318" x1="71.3639" y1="-54.7088" x2="71.3639" y2="44.5469" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#A37356"/>
                        <stop offset="1" stop-color="white"/>
                    </linearGradient>
                </defs>
            </svg>
            <svg className='cloud1' width="56" height="26" viewBox="0 0 56 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path style={{mixBlendMode:'multiply'}} d="M55.0707 25.0274C54.6261 21.8408 53.0406 18.9221 50.6069 16.8101C48.1731 14.6981 45.0554 13.5354 41.8292 13.5365C40.6925 13.5374 39.5607 13.6843 38.4618 13.9738C37.1094 9.46615 34.1752 5.59454 30.1957 3.06687C26.2163 0.539197 21.4575 -0.47567 16.7894 0.207851C12.1214 0.891372 7.85598 3.22762 4.77314 6.78939C1.69029 10.3512 -0.00401434 14.9005 7.14239e-06 19.6056C0.00437382 21.4398 0.264074 23.2645 0.771689 25.0274H55.0707Z" fill="url(#paint0_linear_13_319)"/>
                <defs>
                    <linearGradient id="paint0_linear_13_319" x1="27.5353" y1="-22.5628" x2="27.5353" y2="25.6396" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#A37356"/>
                        <stop offset="1" stop-color="white"/>
                    </linearGradient>
                </defs>
            </svg>
        </div>

        <div className='modal-background' onClick={closeModal}/>
    </>
}