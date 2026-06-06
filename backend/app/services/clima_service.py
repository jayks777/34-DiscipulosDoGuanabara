import requests


class ClimaService:

    @staticmethod
    def obter_previsao(latitude: float, longitude: float):

        url = (
            f"https://api.open-meteo.com/v1/forecast"
            f"?latitude={latitude}"
            f"&longitude={longitude}"
            f"&current=temperature_2m,wind_speed_10m"
            f"&daily=temperature_2m_max,temperature_2m_min"
            f"&timezone=auto"
        )

        response = requests.get(url)

        if response.status_code != 200:
            return None

        return response.json()

    @staticmethod
    def obter_historico(latitude: float, longitude: float):

        url = (
            f"https://archive-api.open-meteo.com/v1/archive"
            f"?latitude={latitude}"
            f"&longitude={longitude}"
            f"&start_date=2025-01-01"
            f"&end_date=2025-01-31"
            f"&daily=temperature_2m_max,temperature_2m_min"
            f"&timezone=auto"
        )

        response = requests.get(url)

        if response.status_code != 200:
            return None

        return response.json()