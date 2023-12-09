from django.shortcuts import render, redirect
from django.urls import reverse


def login_required(f):
    def wrapper_login(*args, **kwargs):
        # If not connected
        if 'login' not in args[0].session:
            return redirect(reverse('checkin:login'))
        return f(*args, **kwargs)
    return wrapper_login