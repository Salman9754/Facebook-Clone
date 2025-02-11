let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let dateOfBirth = document.getElementById('dateOfBirth')
let gender = document.getElementsByName('gender')
let SignUpEmail = document.getElementById('SignUpEmail')
let SignUpPassword = document.getElementById('SignUpPassword')
let signUpBtn = document.getElementById('signUpBtn')
let loginEmail = document.getElementById('loginEmail')
let loginPassword = document.getElementById('loginPassword')
let loginBtn = document.getElementById('loginBtn')
async function signUpFunction() {
    let selectedGender = null
    gender.forEach((g) => {
        if (g.checked) {
            selectedGender = g.value
        }
    })
    try {
        const { data, error } = await supabase.auth.signUp({
            email: SignUpEmail.value,
            password: SignUpPassword.value,
        })
        if (error) throw error
        if (data) {
            console.log(data);
            alert('Account Created')
            try {
                const { error: dataError } = await supabase
                    .from('users')
                    .insert({
                        first_name: firstName.value,
                        last_name: lastName.value,
                        date_of_birth: dateOfBirth.value,
                        gender: selectedGender,
                        email: SignUpEmail.value
                    })
                if (dataError) throw dataError
                window.location.href = 'index.html'
            } catch (error) {
                console.log(error);

            }

        }
    } catch (error) {
        console.log(error);
    }
}
if (signUpBtn) {
    signUpBtn.addEventListener('click', signUpFunction)
}

async function login() {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: loginEmail.value,
            password: loginPassword.value,
        })
        if (error) throw error
        if (data) {
            console.log(data);
            alert('Logged In')
        }
    } catch (error) {
        console.log(error);
        alert(error.message)
    }

}
if(loginBtn){
    loginBtn.addEventListener('click',login)
}