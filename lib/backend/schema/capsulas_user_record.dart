import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class CapsulasUserRecord extends FirestoreRecord {
  CapsulasUserRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "user_id" field.
  String? _userId;
  String get userId => _userId ?? '';
  bool hasUserId() => _userId != null;

  // "items_id" field.
  List<String>? _itemsId;
  List<String> get itemsId => _itemsId ?? const [];
  bool hasItemsId() => _itemsId != null;

  // "fecha" field.
  DateTime? _fecha;
  DateTime? get fecha => _fecha;
  bool hasFecha() => _fecha != null;

  // "portada" field.
  String? _portada;
  String get portada => _portada ?? '';
  bool hasPortada() => _portada != null;

  // "nombre_capsula" field.
  String? _nombreCapsula;
  String get nombreCapsula => _nombreCapsula ?? '';
  bool hasNombreCapsula() => _nombreCapsula != null;

  // "posts_guardados" field.
  List<DocumentReference>? _postsGuardados;
  List<DocumentReference> get postsGuardados => _postsGuardados ?? const [];
  bool hasPostsGuardados() => _postsGuardados != null;

  void _initializeFields() {
    _userId = snapshotData['user_id'] as String?;
    _itemsId = getDataList(snapshotData['items_id']);
    _fecha = snapshotData['fecha'] as DateTime?;
    _portada = snapshotData['portada'] as String?;
    _nombreCapsula = snapshotData['nombre_capsula'] as String?;
    _postsGuardados = getDataList(snapshotData['posts_guardados']);
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('capsulas_user');

  static Stream<CapsulasUserRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => CapsulasUserRecord.fromSnapshot(s));

  static Future<CapsulasUserRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => CapsulasUserRecord.fromSnapshot(s));

  static CapsulasUserRecord fromSnapshot(DocumentSnapshot snapshot) =>
      CapsulasUserRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static CapsulasUserRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      CapsulasUserRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'CapsulasUserRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is CapsulasUserRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createCapsulasUserRecordData({
  String? userId,
  DateTime? fecha,
  String? portada,
  String? nombreCapsula,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'user_id': userId,
      'fecha': fecha,
      'portada': portada,
      'nombre_capsula': nombreCapsula,
    }.withoutNulls,
  );

  return firestoreData;
}

class CapsulasUserRecordDocumentEquality
    implements Equality<CapsulasUserRecord> {
  const CapsulasUserRecordDocumentEquality();

  @override
  bool equals(CapsulasUserRecord? e1, CapsulasUserRecord? e2) {
    const listEquality = ListEquality();
    return e1?.userId == e2?.userId &&
        listEquality.equals(e1?.itemsId, e2?.itemsId) &&
        e1?.fecha == e2?.fecha &&
        e1?.portada == e2?.portada &&
        e1?.nombreCapsula == e2?.nombreCapsula &&
        listEquality.equals(e1?.postsGuardados, e2?.postsGuardados);
  }

  @override
  int hash(CapsulasUserRecord? e) => const ListEquality().hash([
        e?.userId,
        e?.itemsId,
        e?.fecha,
        e?.portada,
        e?.nombreCapsula,
        e?.postsGuardados
      ]);

  @override
  bool isValidKey(Object? o) => o is CapsulasUserRecord;
}
