package org.lsmy.cloud.common.sql.model;

import java.util.ArrayList;
import java.util.List;

import org.lsmy.cloud.common.sql.constant.SQLDict;
import org.lsmy.cloud.common.sql.vo.FieldVO;

public class {{U(data.table)}}SQLField{

	public static List<FieldVO> fields = new ArrayList<FieldVO>();

	static{
    {{each data.fields}}
      	fields.add(new FieldVO("{{$value.Field}}", "{{$value.Comment}}", SQLDict.Type.{{$value.JavaType.type}}, "{{data.table}}", "",null));
    {{/each}}
	}
}
