from rest_framework.exceptions import ValidationError

def date_start_before_end(start, end):
    if start >= end:
        raise ValidationError({
            'Invalid date range': 'End date must be after the start date.'
        })