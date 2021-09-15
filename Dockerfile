FROM tailordev/pandas
COPY ./mlEngine /app
COPY ./requirements.txt /app
WORKDIR /app
RUN pip install -r requirements.txt
ENTRYPOINT ["python", "brain.py"]
