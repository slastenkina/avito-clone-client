// Импортируем необходимые компоненты из MUI
import React from 'react'; // Основной React
import { Box, Button, Pagination, TextField } from '@mui/material'; // UI компоненты из MUI
import Filter from '../filter/filter'; // Компонент для фильтров

// Интерфейс для пропсов компонента
interface AdListUIProps {
  loading: boolean; // Статус загрузки
  error: string | null; // Сообщение об ошибке
  searchQuery: string; // Поисковый запрос
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Обработчик изменения поискового запроса
  handleCreateAd: () => void; // Обработчик перехода на создание объявления
  filterData: { type: string; propertyType: string; brand: string; serviceType: string }; // Данные фильтров
  setFilterData: React.Dispatch<React.SetStateAction<{
    type: string;
    propertyType: string;
    brand: string;
    serviceType: string
  }>>; // Функция для изменения фильтров
  currentAds: Array<{ id: number; name: string; location: string; type: string; image?: string }>; // Список текущих объявлений
  handleOpen: (id: number) => void; // Обработчик открытия объявления по id
  handleDelete: (id: number) => void; // Обработчик удаления объявления по id
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void; // Обработчик смены страницы пагинации
  currentPage: number; // Текущая страница для пагинации
  totalPages: number; // Общее количество страниц для пагинации
}

// Компонент для отображения списка объявлений
const AdListUI: React.FC<AdListUIProps> = ({
                                             loading,
                                             error,
                                             searchQuery,
                                             handleSearchChange,
                                             handleCreateAd,
                                             filterData,
                                             setFilterData,
                                             currentAds,
                                             handleOpen,
                                             handleDelete,
                                             handlePageChange,
                                             currentPage,
                                             totalPages,
                                           }) => {
  // Если данные загружаются, показываем индикатор загрузки
  if (loading) return <p>Загрузка...</p>;

  // Если произошла ошибка, показываем сообщение об ошибке
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div>
      {/* Кнопка для перехода к созданию нового объявления */}
      <Button
        variant="contained"
        onClick={handleCreateAd}
        sx={{ my: 4, backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#388e3c' } }}
      >
        Разместить объявление
      </Button>

      <h2>Список объявлений</h2>

      {/* Поле поиска по названию */}
      <Box mb={2}>
        <TextField
          label="Поиск по названию"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
          data-testid="search-input"
        />
      </Box>

      {/* Компонент фильтров */}
      <Filter filterData={filterData} setFilterData={setFilterData} />

      {/* Отображаем список объявлений */}
      {currentAds.map((ad) => (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          key={ad.id} // Уникальный ключ для каждого объявления
          sx={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: 4,
            marginBottom: 2,
            boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
          }}
          data-testid="ad-list"
        >
          <Box display="flex" alignItems="center" gap={4}>
            {/* Отображение изображения объявления */}
            <Box
              sx={{
                width: '100px',
                height: '100px',
                borderRadius: '8px',
                backgroundColor: ad.image ? 'transparent' : '#e0e0e0', // Если изображение есть, фон прозрачный
                backgroundImage: ad.image ? `url(${ad.image})` : 'none', // Задаем фон как изображение
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Box>
              <h3>{ad.name}</h3> {/* Название объявления */}
              <p>{ad.location}</p> {/* Локация объявления */}
              <p>Категория: {ad.type}</p> {/* Категория объявления */}
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap={2}>
            {/* Кнопка для открытия объявления */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpen(ad.id)}
              sx={{ minWidth: '120px' }}
            >
              Открыть
            </Button>
            {/* Кнопка для удаления объявления */}
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleDelete(ad.id)}
              sx={{ minWidth: '120px' }}
            >
              Удалить
            </Button>
          </Box>
        </Box>
      ))}

      {/* Пагинация */}
      <Pagination
        count={totalPages} // Общее количество страниц
        page={currentPage} // Текущая страница
        onChange={handlePageChange} // Обработчик смены страницы
        color="primary"
        sx={{ mt: 3 }} // Отступ сверху
      />
    </div>
  );
};

export default AdListUI; // Экспортируем компонент
