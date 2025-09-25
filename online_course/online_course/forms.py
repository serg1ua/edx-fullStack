from django import forms


class RegistrationForm(forms.Form):
    username = forms.CharField(max_length=20, min_length=3)
    first_name = forms.CharField(max_length=20, min_length=3)
    last_name = forms.CharField(max_length=20, min_length=3)
    password = forms.PasswordInput(render_value=False)


class LoginForm(forms.Form):
    username = forms.CharField(max_length=20, min_length=3)
    password = forms.PasswordInput(render_value=False)
