export const firstName = `<input 
                            name="firstName" 
                            type="text" placeholder="Nemanja"
                            class="form__input" 
                            required
                        >
                        <label for="firstName"> First Name </label>`

export const lastName = `<input 
                            name="lastName" 
                            type="text" 
                            placeholder="Cvetojevic"
                            class="form__input 
                            required
                        >
                        <label for="lastName"> Last Name</label>`

export const email = `<input 
                        name="email"
                        type="email"  
                        placeholder="johndoe@me.com"
                        class="form__input"
                        required 
                    >
                    <label for="email"> Email address</label>`

export const phone = `<input 
                        name="telNum" 
                        type="tel"  
                        pattern="[0-9]{3} [0-9]{3} [0-9]{4}" 
                        placeholder="069 188 8123"
                        class="form__input"
                        required
                    >
                    <label for="telNum"> Telephone Number</label>`

export const phoneRegistrationButton = `<div id="phoneRegistration">
                                            Regiter with phone number
                                        </div>`
export const emailRegistrationButton = `<div id="emailRegistration">
                                            Regiter email address
                                        </div>`
