<template>
  <q-page padding>
    <div class="page-title">Общий шаблон жалобы</div>
    <div class="row">
      <div class="col"></div>
      <div class="col">
        В УИК избирательного участка №
        <span class="text-negative">(номер)</span>
        от
        <span class="text-negative">(статус)</span>
        <span class="text-negative">(инициалы, фамилия)</span>
      </div>
    </div>
    <div class="row">
      <div class="col text-center text-bold q-mt-md q-mb-md">
        ЗАЯВЛЕНИЕ (ЖАЛОБА) <br />
        о нарушении законодательства о выборах
      </div>

      <div>
        <span class="text-negative">(дата)</span> года в
        <span class="text-negative">(часы)</span> часов
        <span class="text-negative">(минуты)</span> минут мною были
        зафиксированы следующие нарушения Федерального закона от 12.06.2002 №
        67−ФЗ «Об основных гарантиях избирательных прав и права на участие в
        референдуме граждан Российской Федерации» (далее — закон 67−ФЗ):

        <div class="q-my-sm text-negative">
          описание обстоятельств нарушения с указанием допустивших нарушение
          лиц
        </div>

        <div class="q-my-sm text-negative">
          заявляемые требования в связи с нарушением:
          <ul>
            <li>признать описанные действия неправомерными </li>
            <li>перевести допустившего нарушение члена</li>
            <li>комиссии на менее ответственное направление работы</li>
            <li>направить административное заявление в суд для принятия решения об отстранении члена комиссии от работы</li>
            <li> передать материалы о нарушении в правоохранительные органы</li>
            <li> принять иные меры по устранению нарушения — указать конкретно </li>
          </ul>
        </div>

        <div>
          В соответствии с п. 4 ст. 20 закона 67−ФЗ прошу комиссию рассмотреть
          настоящее обращение немедленно, в моём присутствии, принять
          мотивированное решение по существу вопроса, выдать мне заверенную
          копию решения и приложить обращение и решение к протоколу об итогах
          голосования.
        </div>
      </div>
    </div>

    <div class="row q-my-lg">
      <div class="col text-negative">(дата, время)</div>
      <div class="col">
        <span class="text-negative">(подпись)</span>
        <span class="text-negative">(расшифровка подписи)</span>
      </div>
    </div>

    <div class="row q-my-lg">
      <div class="col text-negative">
        (при необходимости — Ф. И. О. свидетелей с указанием их статусов, номеров
        телефонов, отметками «Подтверждаю» и подписями, а также указание на наличие
        фото-, аудио- и видеоматериалов)
      </div>
    </div>

    <div class="text-bold">Получено</div>
    <div class="row q-my-lg text-primary">
      <div class="col">

         дата, время должность
        (председатель или секретарь комиссии)
      </div>
      <div class="col">
        подпись, расшифровка подписи
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GeneralTemplate',
});
</script>
