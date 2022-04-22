import React from 'react';
import { useQueryWithStore } from 'react-admin';

const usePopulatedEnrollments = () => {
  const {
    loaded: enrollmentsLoaded,
    error: enrollmentsError,
    data: enrollments,
  } = useQueryWithStore({
    type: 'getList',
    resource: 'enrollments',
    payload: {
      pagination: { page: 1, perPage: 9999999999 },
      sort: { field: 'id', order: 'DESC' },
    },
  });
  var students, tutoringTypes, populating, populated;

  if (enrollments) {
    students = {};
    tutoringTypes = {};
    students.ids = [];
    tutoringTypes.ids = [];
    enrollments.forEach(enrollment => {
      if (!students[enrollment.studentId]) {
        students[enrollment.studentId] = {};
        students.ids.push(enrollment.studentId);
      }
      if (!tutoringTypes[enrollment.tutoringTypeId]) {
        tutoringTypes[enrollment.tutoringTypeId] = {};
        tutoringTypes.ids.push(enrollment.tutoringTypeId);
      }
    });
  }
  const {
    data: studentsData,
    loaded: studentsLoaded,
    error: studentsError,
  } = useQueryWithStore({
    type: 'getMany',
    resource: 'students',
    payload: {
      ids: (students && students.ids) || [],
    },
  });
  const {
    data: tutoringTypesData,
    loaded: tutoringTypesLoaded,
    error: tutoringTypesError,
  } = useQueryWithStore({
    type: 'getMany',
    resource: 'tutoringTypes',
    payload: {
      ids: (tutoringTypes && tutoringTypes.ids) || [],
    },
  });

  populating =
    enrollments &&
    studentsData &&
    tutoringTypesData &&
    enrollmentsLoaded &&
    studentsLoaded &&
    tutoringTypesLoaded
      ? enrollments.map(enrollment => ({
          student: studentsData.find(
            student => student.id === enrollment.studentId,
          ),
          tutoringType: tutoringTypesData.find(
            tutoringType => tutoringType.id === enrollment.tutoringTypeId,
          ),
          ...enrollment,
        }))
      : null;

  populated =
    populating &&
    populating[0] &&
    populating[0].student &&
    populating[0].tutoringType
      ? populating
      : populating && populating.length
      ? []
      : null;
  return {
    data: populated,
    error:
      studentsError || enrollmentsError || tutoringTypesError
        ? { studentsError, enrollmentsError, tutoringTypesError }
        : null,
    loaded: studentsLoaded && enrollmentsLoaded && tutoringTypesLoaded,
  };
};
export default usePopulatedEnrollments;
