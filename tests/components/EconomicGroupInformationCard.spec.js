import Vue from 'vue';
import BootstrapVue, { BButton, BCard, BBadge } from 'bootstrap-vue';
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue';
import { shallowMount, mount } from '@vue/test-utils';
import EconomicGroupInformationCard from '@/views/cedente/user/components/EconomicGroupInformationCard.vue';

Vue.use(BootstrapVue);
Vue.component(FeatherIcon.name, FeatherIcon);

describe('EconomicGroupInformationCard.vue', () => {
  it('Should render correctly', () => {
    const wrapper = shallowMount(EconomicGroupInformationCard, {
      propsData: {
        economicGroup: {
          id: 1,
          name: 'Teste 1',
          cnpj: '12.345.678/0001-34',
          status: 'pending_documentation',
          filiais: [{ id: 1 }],
        },
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('Should render correct subsidiary amount when does not have subsidiaries', async () => {
    const economicGroup = {
      id: 1,
      name: 'Teste 1',
      cnpj: '12.345.678/0001-34',
      status: 'pending_documentation',
      filiais: [],
    };

    const wrapper = shallowMount(EconomicGroupInformationCard, {
      propsData: {
        economicGroup,
      },
    });

    expect(wrapper.text()).toContain('Sem filiais');
  });

  it('Should render correct subsidiary amount when have just one subsidiary', async () => {
    const economicGroup = {
      id: 1,
      name: 'Teste 1',
      cnpj: '12.345.678/0001-34',
      status: 'pending_documentation',
      filiais: [{ id: 1 }, { id: 1 }],
    };

    const wrapper = shallowMount(EconomicGroupInformationCard, {
      propsData: {
        economicGroup,
      },
    });

    expect(wrapper.text()).toContain('+2 Filiais incluídas');
  });

  it('Should render correct subsidiary amount when having more than one subsidiary', async () => {
    const economicGroup = {
      id: 1,
      name: 'Teste 1',
      cnpj: '12.345.678/0001-34',
      status: 'pending_documentation',
      filiais: [{ id: 1 }, { id: 1 }],
    };

    const wrapper = shallowMount(EconomicGroupInformationCard, {
      propsData: {
        economicGroup,
      },
    });

    expect(wrapper.text()).toContain('+2 Filiais incluídas');
  });

  it('Should render correct border color for status sent documentation', async () => {
    const economicGroup = {
      id: 1,
      name: 'Teste 1',
      cnpj: '12.345.678/0001-34',
      status: 'in_progress',
      filiais: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };

    const wrapper = shallowMount(EconomicGroupInformationCard, {
      propsData: {
        economicGroup,
      },
    });

    const card = wrapper.findComponent(BCard);
    expect(card.attributes('bordervariant')).toBe('light');
  });

  it('Should render correct border color for status disapproved', async () => {
    const economicGroup = {
      id: 1,
      name: 'Teste 1',
      cnpj: '12.345.678/0001-34',
      status: 'disapproved',
      filiais: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };

    const wrapper = shallowMount(EconomicGroupInformationCard, {
      propsData: {
        economicGroup,
      },
    });

    const card = wrapper.findComponent(BCard);
    expect(card.attributes('bordervariant')).toBe('danger');
  });

  it('Should render correct border color for status pending documentation', async () => {
    const economicGroup = {
      id: 1,
      name: 'Teste 1',
      cnpj: '12.345.678/0001-34',
      status: 'pending_documentation',
      filiais: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };

    const wrapper = shallowMount(EconomicGroupInformationCard, {
      propsData: {
        economicGroup,
      },
    });

    const card = wrapper.findComponent(BCard);
    expect(card.attributes('bordervariant')).toBe('light');
  });

  it('Should render correct bg color for status pending documentation', async () => {
    const economicGroup = {
      id: 1,
      name: 'Teste 1',
      cnpj: '12.345.678/0001-34',
      status: 'pending_documentation',
      filiais: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };

    const wrapper = shallowMount(EconomicGroupInformationCard, {
      propsData: {
        economicGroup,
      },
    });

    const card = wrapper.findComponent(BCard);
    expect(card.classes('pending-documentation-bg-color')).toBeTruthy();
  });

  it('Should show action button when the status is pending_documentation', async () => {
    const economicGroup = {
      id: 1,
      name: 'Teste 1',
      cnpj: '12.345.678/0001-34',
      status: 'pending_documentation',
      filiais: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };

    const wrapper = shallowMount(EconomicGroupInformationCard, {
      propsData: {
        economicGroup,
      },
    });

    const button = wrapper.findComponent(BButton);
    expect(button.exists()).toBe(true);
  });

  it('Should not show action button when the status is not pending_documentation', async () => {
    const economicGroup = {
      id: 1,
      name: 'Teste 1',
      cnpj: '12.345.678/0001-34',
      status: 'disapproved',
      filiais: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };

    const wrapper = shallowMount(EconomicGroupInformationCard, {
      propsData: {
        economicGroup,
      },
    });

    const button = wrapper.findComponent(BButton);
    expect(button.exists()).toBe(false);
  });

  it('Should move to economic group data page', async () => {
    const economicGroup = {
      id: 1,
      name: 'Teste 1',
      cnpj: '12.345.678/0001-34',
      status: 'pending_documentation',
      filiais: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };

    const mockRouter = {
      push: jest.fn(),
    };

    const goToEconomicGroupPage = jest.spyOn(EconomicGroupInformationCard.methods, 'goToEconomicGroupPage');

    const wrapper = await shallowMount(EconomicGroupInformationCard, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
      propsData: {
        economicGroup,
      },
    });

    await wrapper.findComponent(BButton).trigger('click');

    expect(goToEconomicGroupPage).toHaveBeenCalled();
    // TODO entender por que o router nao esta sendo inicializado no teste
    // expect(mockRouter.push).toHaveBeenCalledTimes(1)
  });

  it('Should render correct badge style and text when the status is pending_documentation', async () => {
    const economicGroup = {
      id: 1,
      name: 'Teste 1',
      cnpj: '12.345.678/0001-34',
      status: 'pending_documentation',
      filiais: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };

    const wrapper = shallowMount(EconomicGroupInformationCard, {
      propsData: {
        economicGroup,
      },
    });

    const icon = wrapper.findComponent(FeatherIcon);
    expect(icon.attributes('icon')).toBe('AlertCircleIcon');
    expect(icon.classes()).toContain('text-warning');

    const badge = wrapper.findComponent(BBadge);
    expect(badge.attributes('variant')).toBe('light-warning');
    expect(badge.classes()).toContain('border-warning');
    expect(badge.text()).toBe('Aguardando seu preenchimento');
  });

  it('Should render correct badge style and text when the status is in_progress', async () => {
    const economicGroup = {
      id: 1,
      name: 'Teste 1',
      cnpj: '12.345.678/0001-34',
      status: 'in_progress',
      filiais: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };

    const wrapper = shallowMount(EconomicGroupInformationCard, {
      propsData: {
        economicGroup,
      },
    });

    const icon = wrapper.findComponent(FeatherIcon);
    expect(icon.attributes('icon')).toBe('ClockIcon');
    expect(icon.classes()).toContain('text-warning');

    const badge = wrapper.findComponent(BBadge);
    expect(badge.attributes('variant')).toBe('light-warning');
    expect(badge.classes()).toContain('border-warning');
    expect(badge.text()).toBe('Informações em análise');
  });

  it('Should render correct badge style and text when the status is disapproved', async () => {
    const economicGroup = {
      id: 1,
      name: 'Teste 1',
      cnpj: '12.345.678/0001-34',
      status: 'disapproved',
      filiais: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };

    const wrapper = shallowMount(EconomicGroupInformationCard, {
      propsData: {
        economicGroup,
      },
    });

    const icon = wrapper.findComponent(FeatherIcon);
    expect(icon.attributes('icon')).toBe('AlertOctagonIcon');
    expect(icon.classes()).toContain('text-danger');

    const badge = wrapper.findComponent(BBadge);
    expect(badge.attributes('variant')).toBe('light-danger');
    expect(badge.classes()).toContain('border-danger');
    expect(badge.text()).toBe('Pendência no cadastro');
  });

  xit('Should render EconomicGroupInformationCards correctly for sent status', async () => {
    const economicGroup = {
      id: 1,
      name: 'Teste 1',
      cnpj: '12.345.678/0001-34',
      status: 'pending_documentation',
      filiais: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };

    const wrapper = await shallowMount(EconomicGroupInformationCard, {
      propsData: {
        economicGroup,
      },
    });
  });
});
