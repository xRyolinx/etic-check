# Generated by Django 5.0 on 2023-12-07 23:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('checkin', '0002_remove_event_participants_participant_event'),
    ]

    operations = [
        migrations.AlterField(
            model_name='participant',
            name='event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='participants', to='checkin.event'),
        ),
    ]
