from django.shortcuts import render
from .models import *
from django.http import JsonResponse



# page d'event
def event_page(request, name):
    return render(request, 'checkin/event.html')

# api participants des events
def event_api(request, lien):
    # if not post
    if request.method != 'POST':
        return JsonResponse({
            'error' : 'Not found',
        })
    # get event
    event = Event.objects.all().filter(lien=lien)
    
    # not found
    if not event:
        return JsonResponse({
            'error' : 'Event does not exist',
        })
        
    # get participants
    event = event[0]
    participants_querie = event.participants.all()
    participants = []
    
    # to json
    for participant in participants_querie:
        new = {
            'id': 'p' + str(participant.id),
            'nom': participant.nom,
            'prenom': participant.prenom,
            'present': participant.present,
        }
        participants.append(new)
    
    # send 
    return JsonResponse({
        'participants': participants,
    })
    
    
def presence(request, lien):
    # if not post
    if request.method != 'POST':
        return JsonResponse({
            'error' : 'Not found',
        })
        
    # get event
    event = Event.objects.all().filter(lien=lien)
    
    # not found
    if not event:
        return JsonResponse({
            'error' : 'Event does not exist',
        })
    
    # get participant
    event = event[0]
    id = request.POST.get('id')
    participant = event.participants.all().filter(id=id)
    # not found
    if not participant:
        return JsonResponse({
            'error' : 'Participant does not exist',
        })
    # change presence
    participant = participant[0]
    if participant.present:
        participant.present = False
    else:
        participant.present = True
    # save
    participant.save()
    
    # return
    return JsonResponse({
        'result' : 'success',
    })