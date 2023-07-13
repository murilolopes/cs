import Vue from 'vue';
import Vuex from 'vuex';
import BootstrapVue, { BButton } from 'bootstrap-vue';
import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import { FeatherIcon } from 'vue-feather-icons';
import Index from '@/views/admin/conciliation/pages/Index.vue';

Vue.use(BootstrapVue);
Vue.component('feather-icon', FeatherIcon);

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Index.vue', () => {
  let actions = {
    fetchCreditCardBrands: jest.fn().mockResolvedValue({ data: [] }),
    fetchAssignors: jest.fn().mockResolvedValue({ data: [] }),
    fetchAcquirersWithoutPaginate: jest.fn().mockResolvedValue({ data: [] }),
    fetchUrs: jest.fn().mockResolvedValue({
      per_page: 10,
      total: 0,
      current_page: 1,
      data: {
        data: [],
      },
    }),
  };

  const store = new Vuex.Store({
    modules: {
      admin: {
        namespaced: true,
        state: {},
        actions,
      },
    },
  });

  it('Should render correctly', () => {
    const wrapper = shallowMount(Index, { localVue, store });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('Should show conciliate button disabled by default', async () => {
    const wrapper = shallowMount(Index, {
      localVue,
      store,
      propsData: {
        items: [],
        perPage: {
          value: 10,
          label: '10',
        },
        selectedRows: [],
        filters: {
          assignor: 'a',
          acquirer: 'a',
          flag: 'a',
          status: 'a',
        },
      },
    });

    await wrapper.vm.$nextTick();
    const conciliateButton = wrapper.find('#conciliateButton');

    expect(conciliateButton.attributes('disabled')).toBe('true');
  });
});
