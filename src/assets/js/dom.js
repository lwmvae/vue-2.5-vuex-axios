export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}

export function removeClass(el, className) {
  if (hasClass(el, className)) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    el.className = el.className.replace(reg, ' ');
  }
}

export function toggleClass(el, className) {
  if (hasClass(el, className)) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    el.className = el.className.replace(reg, ' ');
  } else {
    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
  }
}