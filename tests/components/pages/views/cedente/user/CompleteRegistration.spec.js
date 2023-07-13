import Vuex from "vuex";
import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import CompleteRegistration from '@/views/cedente/user/pages/CompleteRegistration.vue'
import EconomicGroupInformationCard from '@/views/cedente/user/components/EconomicGroupInformationCard.vue'

import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CompleteRegistration.vue', () => {
  it("Should render correctly", () => {
    let store = new Vuex.Store({
      modules: {
        cedente: {
          namespaced: true,
          actions: {
            getEconomicGroups: jest.fn(() => Promise.resolve([]))
          }
        }
      }
    });

    const wrapper = shallowMount(CompleteRegistration, { localVue, store })
    expect(wrapper.element).toMatchSnapshot();
  });

  it("Should render EconomicGroupInformationCards correctly", async () => {
    const response = {
      data: [{
        name: 'Teste 1',
        cnpj: '12345678901234',
        status: 'active',
        filiais: [{id:1}, {id:2}, {id:3}]
      }, {
        name: 'Teste 2',
        cnpj: '12345678901234',
        status: 'active',
        filiais: [{id:1}, {id:2}]
      }, {
        name: 'Teste 3',
        cnpj: '12345678901234',
        status: 'active',
        filiais: [{id:1}]
      }]
    }

    let store = new Vuex.Store({
      modules: {
        cedente: {
          namespaced: true,
          actions: {
            getEconomicGroups: jest.fn()
          }
        }
      }
    });

    store.dispatch = jest.fn(() => Promise.resolve(response))

    const wrapper = await mount(CompleteRegistration, { localVue, store })
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('cedente/getEconomicGroups')
    expect(wrapper.vm.economicGroups).toEqual(response.data)

    await flushPromises()

    const economicGroupInformationCards = wrapper.findAllComponents(EconomicGroupInformationCard)
    expect(economicGroupInformationCards).toHaveLength(wrapper.vm.economicGroups.length)
  })
})
