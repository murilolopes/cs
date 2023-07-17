<template>
  <div
    id="public-layout"
    class="bordered-layout vertical-layout h-100 vertical-menu-modern menu-collapsed navbar-sticky footer-static"
  >
    <nav
      class="navbar header-navbar navbar navbar-shadow align-items-center navbar-light navbar-expand"
    >
      <div class="bg-secondary d-flex justify-content-center align-items-center navbar-container">
        <div class="d-flex justify-content-between align-items-center">
          <img
            src="/img/cs-head-logo.7bad123d.png"
            class="mr-5"
            style="width: 195px; height: 41px; object-fit: cover"
          />
          <ul class="navbar-nav nav align-items-center ml-auto">
            <ul class="horizontal-list d-flex">
              <li><a href="https://creditsec.com.br" class="lh-36 mb-0 px-75 ml-3"> Início </a></li>
              <li>
                <a id="popover-institucional-menu" href="#" class="lh-36 mb-0 px-75">
                  Institucional
                </a>
              </li>
              <li>
                <a id="popover-informacoes-menu" href="#" class="lh-36 mb-0 px-75"> Informações </a>
              </li>
              <li>
                <a href="https://creditsec.com.br/produtos" class="lh-36 mb-0 px-75"> Produtos </a>
              </li>
              <li>
                <a href="https://creditsec.com.br/servicos" class="lh-36 mb-0 px-75"> Serviços </a>
              </li>
              <li><a href="https://creditsec.com.br" class="lh-36 mb-0 px-75"> Contato </a></li>
              <li><a id="popover-login-menu" href="#" class="lh-36 mb-0 px-75"> Login </a></li>
            </ul>
          </ul>
        </div>
      </div>
    </nav>

    <div class="app-content content">
      <div class="container">
        <div class="row content-header">
          <div class="row mx-3 my-1">
            <div class="pl-0 col-10">
              <h1 class="mb-1">Emissões</h1>
              <h4 class="mb-0">Acompanhe abaixo todas as nossas emissões</h4>
            </div>
            <div class="pr-0 d-flex justify-content-end align-items-center col-2"></div>
          </div>
        </div>
      </div>
      <div class="content container">
        <div class="app-content content">
          <router-view />
        </div>
      </div>
    </div>

    <footer class="footer-light footer-sticky">
      <div>
        <div class="bg-secondary p-1 px-2">
          <div class="container">
            <div>
              <img src="/img/logo-cs.fb86fd24.svg" alt="Creditsec Logo" height="30" class="" />
            </div>
            <div class="d-flex justify-content-between mt-2">
              <div class="text-white">
                <p class="pr-3">
                  Creditcorp Securitzadora S.A é uma sociedade anônima registrada sob o CNPJ/MF
                  49.947.676/0001-86.<br /><br />
                  Fale com a CreditCorp, ligue (11) 3034-3417 ou envie um email para
                  comercial@creditsec.com.br<br />
                  Rua Fidêncio Ramos, 100, 14 andar - Vila Olímpia - São Paulo - SP. CEP:
                  04551-010<br /><br />
                  A Creditsec é uma Securitizadora registrada na CVM (Comissão de Valores
                  Mobiliários).
                </p>
              </div>
              <div>
                <ul class="list-unstyled text-nowrap">
                  <li><a href="https://creditsec.com.br" class="lh-36 mb-0 px-75"> Início </a></li>
                  <li>
                    <a id="popover-footer-institucional-menu" href="#" class="lh-36 mb-0 px-75">
                      Institucional
                    </a>
                  </li>
                  <li>
                    <a id="popover-footer-informacoes-menu" href="#" class="lh-36 mb-0 px-75">
                      Informações
                    </a>
                  </li>
                  <li>
                    <a href="https://creditsec.com.br/produtos" class="lh-36 mb-0 px-75">
                      Produtos
                    </a>
                  </li>
                  <li>
                    <a href="https://creditsec.com.br/servicos" class="lh-36 mb-0 px-75">
                      Serviços
                    </a>
                  </li>
                  <li><a href="https://creditsec.com.br" class="lh-36 mb-0 px-75"> Contato </a></li>
                  <li>
                    <a id="popover-footer-login-menu" href="#" class="lh-36 mb-0 px-75"> Login </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-black p-1 d-flex justify-content-between align-items-center px-2">
          <div class="container">
            <span class="text-white">® Creditsec – Todos os direitos reservados</span>
          </div>
        </div>
        <!----><!----><!---->
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  components: {},
}
</script>

<style lang="scss" scoped>
#public-layout {
  .content {
    padding: 0;
    margin-left: 0;
  }
  .content .app-content {
    padding: 0rem 2rem 0;
  }
}
</style>
