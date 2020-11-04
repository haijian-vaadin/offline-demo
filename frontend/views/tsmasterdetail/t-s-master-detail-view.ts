import { customElement, html, LitElement, property, query, unsafeCSS } from 'lit-element';

import { showNotification } from '@vaadin/flow-frontend/a-notification';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-form-layout/vaadin-form-item';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-split-layout/vaadin-split-layout';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-date-picker';

import { EndpointError } from '@vaadin/flow-frontend/Connect';

// import the remote endpoint
import * as PersonEndpoint from '../../generated/PersonEndpoint';

// import types used in the endpoint
import Person from '../../generated/com/example/application/data/entity/Person';

// utilities to import style modules
import { CSSModule } from '@vaadin/flow-frontend/css-utils';

import styles from './t-s-master-detail-view.css';
import { Binder, field } from '@vaadin/form';
import PersonModel from '../../generated/com/example/application/data/entity/PersonModel';
import { GridDataProviderCallback, GridDataProviderParams } from '@vaadin/vaadin-grid/vaadin-grid';

@customElement('t-s-master-detail-view')
export class TSMasterDetailViewElement extends LitElement {
  static get styles() {
    return [CSSModule('lumo-typography'), unsafeCSS(styles)];
  }

  @query('#grid')
  private grid: any;

  @property({ type: Number })
  private gridSize = 0;

  private gridDataProvider = this.getGridData.bind(this);

  private binder = new Binder(this, PersonModel);

  render() {
    return html`
      <vaadin-split-layout class="full-size">
        <div class="grid-wrapper">
          <vaadin-grid
            id="grid"
            class="full-size"
            theme="no-border"
            .size="${this.gridSize}"
            .dataProvider="${this.gridDataProvider}"
            @active-item-changed=${this.itemSelected}
          >
            <vaadin-grid-sort-column path="firstName"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="lastName"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="email"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="phone"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="dateOfBirth"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="occupation"></vaadin-grid-sort-column>
          </vaadin-grid>
        </div>

        <div id="editor-layout">
          <div id="editor">
            <vaadin-form-layout>
              <vaadin-form-item>
                <label slot="label">First Name</label>
                <vaadin-text-field
                  class="full-width"
                  id="firstName"
                  ...="${field(this.binder.model.firstName)}"
                ></vaadin-text-field>
              </vaadin-form-item>
              <vaadin-form-item>
                <label slot="label">Last Name</label>
                <vaadin-text-field
                  class="full-width"
                  id="lastName"
                  ...="${field(this.binder.model.lastName)}"
                ></vaadin-text-field>
              </vaadin-form-item>
              <vaadin-form-item>
                <label slot="label">Email</label>
                <vaadin-text-field
                  class="full-width"
                  id="email"
                  ...="${field(this.binder.model.email)}"
                ></vaadin-text-field>
              </vaadin-form-item>
              <vaadin-form-item>
                <label slot="label">Phone</label>
                <vaadin-text-field
                  class="full-width"
                  id="phone"
                  ...="${field(this.binder.model.phone)}"
                ></vaadin-text-field>
              </vaadin-form-item>
              <vaadin-form-item>
                <label slot="label">Date of birth</label>
                <vaadin-date-picker
                  class="full-width"
                  id="dateOfBirth"
                  ...="${field(this.binder.model.dateOfBirth)}"
                ></vaadin-date-picker>
              </vaadin-form-item>
              <vaadin-form-item>
                <label slot="label">Occupation</label>
                <vaadin-text-field
                  class="full-width"
                  id="occupation"
                  ...="${field(this.binder.model.occupation)}"
                ></vaadin-text-field>
              </vaadin-form-item>
            </vaadin-form-layout>
          </div>
          <vaadin-horizontal-layout id="button-layout" theme="spacing">
            <vaadin-button theme="primary" @click="${this.save}">Save</vaadin-button>
            <vaadin-button theme="tertiary" @click="${this.cancel}">Cancel</vaadin-button>
          </vaadin-horizontal-layout>
        </div>
      </vaadin-split-layout>
    `;
  }

  private async getGridDataSize() {
    return PersonEndpoint.count();
  }
  private async getGridData(params: GridDataProviderParams, callback: GridDataProviderCallback) {
    const index = params.page * params.pageSize;
    const data = await PersonEndpoint.list(index, params.pageSize, params.sortOrders as any);
    callback(data);
  }

  // Wait until all elements in the template are ready to set their properties
  async firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);

    this.gridSize = await this.getGridDataSize();
  }

  private async itemSelected(event: CustomEvent) {
    const item: Person = event.detail.value as Person;
    this.grid.selectedItems = item ? [item] : [];

    if (item) {
      const personFromBackend = await PersonEndpoint.get(item.id);
      personFromBackend ? this.binder.read(personFromBackend) : this.refreshGrid();
    } else {
      this.clearForm();
    }
  }

  private async save() {
    try {
      await this.binder.submitTo(PersonEndpoint.update);
      this.clearForm();
      if (!this.binder.value.id) {
        // We added a new item
        this.gridSize++;
      }
      this.refreshGrid();
      showNotification('Person details stored.', { position: 'bottom-start' });
    } catch (error) {
      if (error instanceof EndpointError) {
        showNotification('Server error. ' + error.message, { position: 'bottom-start' });
      } else {
        throw error;
      }
    }
  }

  private cancel() {
    this.grid.activeItem = undefined;
  }

  private clearForm() {
    this.binder.clear();
  }

  private refreshGrid() {
    this.grid.selectedItems = [];
    this.grid.clearCache();
  }
}
