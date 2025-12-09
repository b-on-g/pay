namespace $.$$ {
	export class $bog_pay_app_account_button extends $.$bog_pay_app_account_button {
		@$mol_mem
		tbank_sdk() {
			return $mol_import.script('https://integrationjs.tbank.ru/integration.js').TinkoffPayments
		}

		@$mol_mem
		payment() {
			const TinkoffPayments = this.tbank_sdk()

			return new TinkoffPayments({
				terminalKey: '1765295464453DEMO',
				product: 'eacq',
			})
		}

		@$mol_action
		pay_click() {
			const payment = this.payment()

			$mol_wire_async(this)
				.pay_process()
				.then(
					result => {
						if (result?.success) {
							this.$.$mol_notify.show({
								context: 'payment',
								message: 'Оплата прошла успешно!',
								uri: '',
							})
						}
					},
					error => {
						$mol_wire_async(this)
							.pay_process()
							.then(
								result => {
									if (result?.success) {
										this.$.$mol_notify.show({
											context: 'payment',
											message: 'Оплата прошла успешно!',
											uri: '',
										})
									}
								},
								error => {
									this.$.$mol_notify.show({
										context: 'payment',
										message:
											'ОшибкаОшибка оплаты:оплаты: ' +
											(error?.message || String(error)) +
											(error?.message || String(error)),
										uri: '',
									})
								},
							)
					},
				)
		}

		async pay_process() {
			const payment = this.payment()

			return await payment.pay({
				amount: this.amount(),
				description: this.description(),
				receiptData: {
					email: 'customer@example.com',
					items: [
						{
							name: this.description(),
							price: this.amount(),
							quantity: 1,
							amount: this.amount(),
							tax: 'none',
						},
					],
				},
			})
		}
	}
}
