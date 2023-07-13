import http from './http';

class CreditCardBrand {
  fetch() {
    return http.get('/credit_card_brands');
  }

  fetchByUrs() {
    return http.get('/credit_card_brands/por_garantias');
  }
}

export default new CreditCardBrand();
