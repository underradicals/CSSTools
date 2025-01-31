import './style.scss';

const { log, dir } = console;

const ColorBar = select('.color-bar');
const ColorBarChildren = [...(ColorBar as HTMLElement).children]
const currentChild = select('[currentColor]') as HTMLElement;
const CurrentColorValue = select('.current-color-bar h2 span:last-child') as HTMLElement;

const SlidingWindow = document.createElement('div');
SlidingWindow.classList.add('sliding-window');
ColorBar?.appendChild(SlidingWindow);
SlidingWindow.style.width = `${currentChild?.getBoundingClientRect().width}px`;


const state = {
  prevClientX: currentChild.getBoundingClientRect().left,
  currentClientX: currentChild.getBoundingClientRect().left,
  prevButton: document.createElement('div') as HTMLElement,
  currentButton: currentChild,
  currentColor: 'Red'
}

export function select(query: string) {
  return document.querySelector(query);
}

state.currentClientX = currentChild.getBoundingClientRect().left;
CurrentColorValue.textContent = state.currentColor;

function handleColorBarClickEvent(event: Event) {
  event.stopPropagation();
  const target = event.target as HTMLElement;
  let button: HTMLElement | null = null;
  if (target.localName === 'section') return;
  if (target.localName === 'div' && target.classList.contains("color-cell")) {
    button = (event.target as HTMLElement);
    CurrentColorValue.textContent = (event.target as HTMLElement).nextElementSibling?.textContent as string;
  }
  if (target.localName === 'div' && !target.classList.contains('color-cell')) {
    CurrentColorValue.textContent = (event.target as HTMLElement).previousElementSibling?.textContent as string;
    button = (event.target as HTMLElement).parentElement as HTMLElement;
  }
  if (target.localName === 'p') {
    CurrentColorValue.textContent = (event.target as HTMLElement).textContent;
    button = (event.target as HTMLElement).parentElement;
  }
  // log(button);
  state.prevButton = state.currentButton as HTMLElement;
  state.currentButton = button as HTMLElement;
  state.prevButton.removeAttribute("currentcolor");
  (state.currentButton as HTMLElement).setAttribute('currentcolor', '');
  state.currentClientX = button?.getBoundingClientRect().left as number;
  SlidingWindow.style.setProperty('--sliding_window_pos', `${Math.abs(state.currentClientX - state.prevClientX)}px`);
}



ColorBar?.addEventListener("click", handleColorBarClickEvent)

// log(ColorBar);
// log(CurrentColorValue);
// log(ColorBarChildren);
// dir(currentChild);