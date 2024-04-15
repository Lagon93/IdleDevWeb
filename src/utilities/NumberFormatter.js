/* global BigInt */
const CIENTIFICO = 1;
const INGENIERO = 2;
const UNIDAD = 3;
const UNIDADES = {
  '0': '',
  '3': 'k',
  '6': 'm',
  '9': 'b',
  '12': 't',
  '15': 'q',
  '18': 'qi',
  '21': 'sx',
  '24': 'sp',
  '27': 'oc',
  '30': 'no',
  '33': 'dc'
};
class NumberFormatter {
  constructor(mode) {
    if(mode && (mode === CIENTIFICO || mode === INGENIERO || mode === UNIDAD)) {
      this.mode = mode;
    } else {
      this.mode = UNIDAD;
    }
  }
  formatBigInt(n) {
    var out = '';
    switch(this.mode) {
      case CIENTIFICO: out = this.formatoCientifico(n);break;
      case INGENIERO: out = this.formatoIngeniero(n);break;
      case UNIDAD: out = this.formatoUnidad(n);break;
    }
    return out;
  }
  formatNumber(n) {
    return this.formatBigInt(BigInt(Math.round(100 * n)));
  }
  formatoCientifico(n) {
    var e = 0;
    while(n >= BigInt(1000)) {
      n /= 10;
      e++;
    }
    var n2 = Number(n) / 100.0;
    return `${n2.toFixed(2)}${e > 0 ? 'e' + e : ''}`;
  }
  formatoIngeniero(n) {
    var e = 0;
    while(n >= BigInt(100000)) {
      n /= 1000;
      e+=3;
    }
    var n2 = Number(n) / 100.0;
    return `${n2.toFixed(2)}${e > 0 ? 'e' + e : ''}`;
  }
  formatoUnidad(n) {
    var e = 0;

    while(n >= BigInt(100000)) {
      n /= 1000;
      e+=3;
    }
    var n2 = Number(n) / 100.0;
    var eStr = `${e}`;
    var out = '';
    if (UNIDADES && UNIDADES[eStr]) {
      out = `${n2.toFixed(2)} ${UNIDADES[eStr]}`;
    } else {
      out = `${n2.toFixed(2)}${e > 0 ? 'e' + e : ''}`;
    }
    return out;
  }
}

export default NumberFormatter;