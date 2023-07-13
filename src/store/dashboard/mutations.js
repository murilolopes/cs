export default {
  SET_SPED_FISCAL_REFERENCE_YEARS(state, payload) {
    state.spedFiscal.referenceYears = payload.sort((a, b) =>  b-a)
  },

  UPDATE_LINKAPITALSOLICITATION_CERTIFICATE(state, certificate) {
    state.linkapitalSolicitation = certificate
  }
}
