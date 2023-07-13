export const brlToFloat = value => {
  if (typeof value === 'number') return value;

  return parseFloat(value.replace('R$', '').replaceAll('.', '').replace(',', '.'))
}

export const floatToBrl = (value, minimumFractionDigits = 2) => {
  if (!value) return 'R$ 0,00'

  return parseFloat(value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL', minimumFractionDigits})
}