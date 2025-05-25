import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class ColeccionesRecord extends FirestoreRecord {
  ColeccionesRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "portada" field.
  String? _portada;
  String get portada => _portada ?? '';
  bool hasPortada() => _portada != null;

  // "titulo" field.
  String? _titulo;
  String get titulo => _titulo ?? '';
  bool hasTitulo() => _titulo != null;

  // "fecha_creacion" field.
  DateTime? _fechaCreacion;
  DateTime? get fechaCreacion => _fechaCreacion;
  bool hasFechaCreacion() => _fechaCreacion != null;

  // "id_coleccion" field.
  String? _idColeccion;
  String get idColeccion => _idColeccion ?? '';
  bool hasIdColeccion() => _idColeccion != null;

  // "id_autorcoleccion" field.
  String? _idAutorcoleccion;
  String get idAutorcoleccion => _idAutorcoleccion ?? '';
  bool hasIdAutorcoleccion() => _idAutorcoleccion != null;

  DocumentReference get parentReference => reference.parent.parent!;

  void _initializeFields() {
    _portada = snapshotData['portada'] as String?;
    _titulo = snapshotData['titulo'] as String?;
    _fechaCreacion = snapshotData['fecha_creacion'] as DateTime?;
    _idColeccion = snapshotData['id_coleccion'] as String?;
    _idAutorcoleccion = snapshotData['id_autorcoleccion'] as String?;
  }

  static Query<Map<String, dynamic>> collection([DocumentReference? parent]) =>
      parent != null
          ? parent.collection('colecciones')
          : FirebaseFirestore.instance.collectionGroup('colecciones');

  static DocumentReference createDoc(DocumentReference parent, {String? id}) =>
      parent.collection('colecciones').doc(id);

  static Stream<ColeccionesRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => ColeccionesRecord.fromSnapshot(s));

  static Future<ColeccionesRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => ColeccionesRecord.fromSnapshot(s));

  static ColeccionesRecord fromSnapshot(DocumentSnapshot snapshot) =>
      ColeccionesRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static ColeccionesRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      ColeccionesRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'ColeccionesRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is ColeccionesRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createColeccionesRecordData({
  String? portada,
  String? titulo,
  DateTime? fechaCreacion,
  String? idColeccion,
  String? idAutorcoleccion,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'portada': portada,
      'titulo': titulo,
      'fecha_creacion': fechaCreacion,
      'id_coleccion': idColeccion,
      'id_autorcoleccion': idAutorcoleccion,
    }.withoutNulls,
  );

  return firestoreData;
}

class ColeccionesRecordDocumentEquality implements Equality<ColeccionesRecord> {
  const ColeccionesRecordDocumentEquality();

  @override
  bool equals(ColeccionesRecord? e1, ColeccionesRecord? e2) {
    return e1?.portada == e2?.portada &&
        e1?.titulo == e2?.titulo &&
        e1?.fechaCreacion == e2?.fechaCreacion &&
        e1?.idColeccion == e2?.idColeccion &&
        e1?.idAutorcoleccion == e2?.idAutorcoleccion;
  }

  @override
  int hash(ColeccionesRecord? e) => const ListEquality().hash([
        e?.portada,
        e?.titulo,
        e?.fechaCreacion,
        e?.idColeccion,
        e?.idAutorcoleccion
      ]);

  @override
  bool isValidKey(Object? o) => o is ColeccionesRecord;
}
