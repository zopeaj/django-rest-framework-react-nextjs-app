from jose import jwt
from datetime import timedelta
from datetime import datetime
from jwt import JWTExpired

class JwtConfig:
    def __init__(self):
        self.algorithm = "HS256"
        self.secret_key = "4b1ba745dbf22eade5cbb1a571144e75c0f068125cfa7cf183468111a8521627"
        self.EXPIRE_TOKEN_DATETIME: int = 15

    def generate_token(self, sub, delta):
        data_toencode = { }
        if delta is not None:
            expires_date = datetime.utcnow() + timedelta(minutes=delta)
        else:
            expires_date = datetime.utcnow() + timedelta(minutes=self.EXPIRE_TOKEN_DATETIME)

        data_toencode.update({'exp': expires_date, 'sub': sub})
        encoded_data = jwt.encode(data_toencode, self.get_secret_key(), algorithm=self.get_secret_key())

    def decode_token(self, data):
        decoded_data = jwt.decode(data, self.get_secret_key(), algorithms=[self.get_algorithm()])
        try:
            exp = decoded_data.get("exp")
            return exp < datetime.utcnow()
        except JWTExpired as err:
            raise err

        return decoded_data


    def get_secret_key(self):
        return self.secret_key

    def get_algorithm(self):
        return self.algorithm

