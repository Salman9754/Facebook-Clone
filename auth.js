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
let myLoader = document.getElementById('myLoader')
let logOutBtn = document.getElementById('logOutBtn')

async function signUpFunction() {
    let selectedGender = null
    gender.forEach((g) => {
        if (g.checked) {
            selectedGender = g.value
        }
    })
    try {
        myLoader.style.display = 'block'
        const { data, error } = await supabase.auth.signUp({
            email: SignUpEmail.value,
            password: SignUpPassword.value,
        })
        if (error) throw error
        if (data) {
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
                myLoader.style.display = 'none'
                setTimeout(() => {
                    window.location.href = 'index.html'
                }, 1000)
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error"
                });
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
        myLoader.style.display = 'block'
        const { data, error } = await supabase.auth.signInWithPassword({
            email: loginEmail.value,
            password: loginPassword.value,
        })
        if (error) throw error
        if (data) {
            myLoader.style.display = 'none'
            setTimeout(() => {
                window.location.href = 'home.html'
            }, 1000)
        }
    } catch (error) {
        myLoader.style.display = 'none'
        Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error"
        });
    }

}
if (loginBtn) {
    loginBtn.addEventListener('click', login)
}

async function logOut() {
    try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        setTimeout(() => {
            window.location.href = 'index.html'
        }, 1000)
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error"
        });
    }

}
if (logOutBtn) {
    logOutBtn.addEventListener('click', logOut)
}

