# Generated by Django 4.2.4 on 2023-08-25 13:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('landing', '0022_alter_homecarousel_order'),
    ]

    operations = [
        migrations.RenameField(
            model_name='contact',
            old_name='date_heure',
            new_name='date_heure_envoi',
        ),
        migrations.RenameField(
            model_name='rendez_vous',
            old_name='date_heure',
            new_name='date_heure_envoi',
        ),
        migrations.AddField(
            model_name='rendez_vous',
            name='date_rdv',
            field=models.CharField(default=' ', max_length=64),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='service',
            name='description',
            field=models.CharField(blank=True, max_length=128),
        ),
    ]
