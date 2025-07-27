import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  type: 'campaign' | 'meeting' | 'deadline' | 'launch';
}

interface ModernCalendarProps {
  events?: CalendarEvent[];
  onDatePress?: (date: string) => void;
  onEventPress?: (event: CalendarEvent) => void;
}

const ModernCalendar: React.FC<ModernCalendarProps> = ({
  events = [],
  onDatePress,
  onEventPress,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const hasEvent = (dateString: string) => {
    return events.some(event => event.date === dateString);
  };

  const getEventType = (dateString: string) => {
    const event = events.find(event => event.date === dateString);
    return event?.type || 'campaign';
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'campaign':
        return '#0FFF95';
      case 'meeting':
        return '#F2DC5D';
      case 'deadline':
        return '#E3170A';
      case 'launch':
        return '#9747FF';
      default:
        return '#0FFF95';
    }
  };

  const isToday = (dateString: string) => {
    const today = new Date();
    const todayString = formatDate(today.getFullYear(), today.getMonth(), today.getDate());
    return dateString === todayString;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleDatePress = (day: number) => {
    const dateString = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(dateString);
    onDatePress?.(dateString);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <View key={`empty-${i}`} style={styles.dayCell} />
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
      const hasEventOnDay = hasEvent(dateString);
      const eventType = getEventType(dateString);
      const isSelectedDate = selectedDate === dateString;
      const isTodayDate = isToday(dateString);

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCell,
            isTodayDate && styles.todayCell,
            isSelectedDate && styles.selectedCell,
          ]}
          onPress={() => handleDatePress(day)}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.dayText,
            isTodayDate && styles.todayText,
            isSelectedDate && styles.selectedText,
          ]}>
            {day}
          </Text>
          {hasEventOnDay && (
            <View style={[
              styles.eventDot,
              { backgroundColor: getEventTypeColor(eventType) }
            ]} />
          )}
        </TouchableOpacity>
      );
    }

    return days;
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    const todayString = formatDate(today.getFullYear(), today.getMonth(), today.getDate());
    
    return events
      .filter(event => event.date >= todayString)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 3);
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayString = formatDate(today.getFullYear(), today.getMonth(), today.getDate());
    const tomorrowString = formatDate(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());

    if (dateString === todayString) return 'Hoy';
    if (dateString === tomorrowString) return 'Mañana';
    
    return `${date.getDate()} ${months[date.getMonth()].slice(0, 3)}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Próximos Eventos</Text>
      </View>

      {/* Calendar Header */}
      <View style={styles.calendarHeader}>
        <TouchableOpacity onPress={() => navigateMonth('prev')} style={styles.navButton}>
          <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        
        <Text style={styles.monthText}>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>
        
        <TouchableOpacity onPress={() => navigateMonth('next')} style={styles.navButton}>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Week Days */}
      <View style={styles.weekDaysContainer}>
        {weekDays.map((day, index) => (
          <View key={index} style={styles.weekDayCell}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={styles.calendarGrid}>
        {renderCalendarDays()}
      </View>

      {/* Upcoming Events List */}
      <View style={styles.eventsContainer}>
        <Text style={styles.eventsTitle}>Próximos Eventos</Text>
        {getUpcomingEvents().length > 0 ? (
          getUpcomingEvents().map((event) => (
            <TouchableOpacity
              key={event.id}
              style={styles.eventItem}
              onPress={() => onEventPress?.(event)}
              activeOpacity={0.7}
            >
              <View style={[
                styles.eventTypeIndicator,
                { backgroundColor: getEventTypeColor(event.type) }
              ]} />
              <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDate}>{formatEventDate(event.date)}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="rgba(255, 255, 255, 0.5)" />
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsText}>No hay eventos próximos</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  header: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  weekDayText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  dayCell: {
    width: (screenWidth - 80) / 7, // 7 days per week, accounting for container padding
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  todayCell: {
    backgroundColor: 'rgba(15, 255, 149, 0.2)',
    borderRadius: 8,
  },
  selectedCell: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  dayText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  todayText: {
    color: '#0FFF95',
    fontFamily: 'Poppins-SemiBold',
  },
  selectedText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
  eventDot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  eventsContainer: {
    marginTop: 8,
  },
  eventsTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  eventTypeIndicator: {
    width: 3,
    height: 24,
    borderRadius: 2,
    marginRight: 12,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  eventDate: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  noEventsContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  noEventsText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

export default ModernCalendar;